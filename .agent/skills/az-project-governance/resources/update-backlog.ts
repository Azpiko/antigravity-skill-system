import fs from 'fs';
import path from 'path';

/**
 * Script de mise à jour automatique de la backlog.
 * Met à jour la version et les statistiques globales.
 */

const BACKLOG_PATH = path.join(process.cwd(), '.docs', '1-pilotage', 'backlog.md');
const PKG_PATH = path.join(process.cwd(), 'package.json');

function updateBacklog() {
  if (!fs.existsSync(BACKLOG_PATH)) {
    console.error(`❌ Fichier non trouvé : ${BACKLOG_PATH}`);
    return;
  }

  // 1. Lire la version actuelle
  const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf-8'));
  const version = pkg.version;

  // 2. Lire le contenu de la backlog
  let content = fs.readFileSync(BACKLOG_PATH, 'utf-8');

  // 3. Extraire depuis la source de vérité absolue : time-analysis.md
  const TIME_ANALYSIS_PATH = path.join(process.cwd(), '.docs', 'history', 'time-analysis.md');
  let totalSP = 0;
  let totalHoursPassé = 0;
  let totalHoursEst = 0;

  if (fs.existsSync(TIME_ANALYSIS_PATH)) {
    const taContent = fs.readFileSync(TIME_ANALYSIS_PATH, 'utf-8');
    
    // Extraire les totaux purs
    const spMatch = taContent.match(/- \*\*Story Points Totaux\*\* : \*\*(\d+)\s*SP\*\*/);
    const reelMatch = taContent.match(/- \*\*Temps Réel Consommé\*\* : \*\*([\d.]+)\s*heures\*\*/);
    const estMatch = taContent.match(/- \*\*Temps Estimé Total\*\* : \*\*([\d.]+)\s*heures\*\*/);
    
    if (spMatch) totalSP = parseInt(spMatch[1]);
    if (reelMatch) totalHoursPassé = parseFloat(reelMatch[1]);
    if (estMatch) totalHoursEst = parseFloat(estMatch[1]);

    console.log(`Debug Extracted: SP=${totalSP}, Est=${totalHoursEst}, Reel=${totalHoursPassé}`);

    // Extraire les versions documentées : | vX.Y.Z | Description | SP | Est | Réel | Vélocité |
    const versionRegex = /\|\s*(v\d+\.\d+\.\d+[^\s|]*)\s*\|\s*(.*?)\s*\|\s*(\d+)\s*\|\s*([\d.]+[h~]*)\s*\|\s*([\d.]+[h~]*)\s*\|.*?\|/g;
    let match;
    const versionsToInject = [];
    
    while ((match = versionRegex.exec(taContent)) !== null) {
      const [, version, desc, spStr, estStr, reelStr] = match;
      versionsToInject.push({ version, desc: desc.trim(), sp: parseInt(spStr), est: estStr.trim(), reel: reelStr.trim() });
    }

    // Injecter conditionnellement les versions manquantes dans la backlog
    versionsToInject.forEach(v => {
      if (!content.includes(v.version)) {
        // Ajouter la ligne juste avant TOTAL AUDITÉ, on assume Arbitrairement Phase 7 pour les releases (ou "All")
        const newRow = `| **${v.version} - ${v.desc}** | 7 | ${v.sp} | ${v.est} | ${v.reel} | ✅ |\n`;
        content = content.replace(/\| \*\*TOTAL AUDITÉ\*\* \|/, newRow + '| **TOTAL AUDITÉ** |');
      }
    });

    // Mettre à jour la ligne TOTAL AUDITÉ avec les vrais chiffres
    content = content.replace(/\| \*\*TOTAL AUDITÉ\*\* \|.*(\r?\n|$)/, `| **TOTAL AUDITÉ** | | **${totalSP}** | **${totalHoursEst.toFixed(1)}h** | **${totalHoursPassé.toFixed(1)}h** | |$1`);

  } else {
    console.warn("⚠️ Fichier time-analysis.md introuvable, impossible de lire la source de vérité.");
  }

  // 4. Analyser la Roadmap pour la projection
  const roadmapMatch = content.match(/## 🚀 Roadmap V3[\s\S]*?\n([\s\S]*?)\n---/);
  const roadmapRowsText = roadmapMatch ? roadmapMatch[1].trim() : "";
  let remainingSP = 0;

  if (roadmapRowsText) {
    const roadmapRows = roadmapRowsText.split('\n').filter(row => 
      row.includes('|') && 
      !row.includes(':---') && 
      !row.toLowerCase().includes('feature')
    );
    
    roadmapRows.forEach(row => {
      const columns = row.split('|').map(c => c.trim()).filter(c => c !== "");
      // Format: | Feature | SP | Estimation | Priorité |
      if (columns.length >= 2) {
        const sp = parseInt(columns[1]);
        if (!isNaN(sp)) remainingSP += sp;
      }
    });
  }

  // 5. Calculs de Projection
  const velocity = totalHoursPassé > 0 ? (totalSP / totalHoursPassé) : 7.50;
  const hoursNeeded = remainingSP / velocity;
  const CAPACITY_PER_WEEK = 10; // Hypothèse: 10h par semaine
  const weeksNeeded = Math.ceil(hoursNeeded / CAPACITY_PER_WEEK);
  
  const now = new Date();
  const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
  
  const landingDate = new Date();
  landingDate.setDate(landingDate.getDate() + (weeksNeeded * 7));
  const landingDateStr = `${landingDate.getDate().toString().padStart(2, '0')}/${(landingDate.getMonth() + 1).toString().padStart(2, '0')}/${landingDate.getFullYear()}`;

  // 6. Génération du Graphique Mermaid (GANTT)
  const projectionMermaid = `
\`\`\`mermaid
gantt
    title Projection d'Atterrissage TeeLov V3
    dateFormat  DD/MM/YYYY
    axisFormat  %d/%m
    section Développement
    Terminé (${totalSP} SP)           :done, a1, 24/01/2026, ${dateStr}
    Roadmap V3 (${remainingSP} SP)         :active, a2, ${dateStr}, ${weeksNeeded}w
    section Atterrissage
    Date estimée : milestone, m1, ${landingDateStr}, 0d
\`\`\`
`;

  // 7. Mettre à jour les statistiques globales
  content = content.replace(/- \*\*Version Actuelle\*\* : .*/, `- **Version Actuelle** : ${version}`);
  content = content.replace(/- \*\*Total Story Points \(SP\)\*\* : .*/, `- **Total Story Points (SP)** : ${totalSP}`);
  content = content.replace(/- \*\*Temps Total Passé \(Réel\)\*\* : .*/, `- **Temps Total Passé (Réel)** : ~${totalHoursPassé.toFixed(1)}h`);
  content = content.replace(/- \*\*Vélocité Moyenne\*\* : .*/, `- **Vélocité Moyenne** : ${velocity.toFixed(2)} SP/h`);

  // 8. Injecter la projection
  const projectionSection = `## 🎯 Projection d'Atterrissage\n- **SP Restants** : ${remainingSP} SP\n- **Charge estimée** : ~${hoursNeeded.toFixed(1)}h\n- **Capacité de production** : ${CAPACITY_PER_WEEK}h/semaine\n- **Date d'atterrissage estimée** : **${landingDateStr}**\n${projectionMermaid}\n`;
  
  if (content.includes('## 🎯 Projection d\'Atterrissage')) {
    content = content.replace(/## 🎯 Projection d'Atterrissage[\s\S]*?(?=##|$)/, projectionSection);
  } else {
    content = content.replace('## 📝 Matrice de Complexité', `${projectionSection}\n## 📝 Matrice de Complexité`);
  }

  // 9. Mettre à jour la date en bas de page
  content = content.replace(/\*Backlog auditée et validée le .*\*/, `*Backlog auditée et validée le ${dateStr}*`);

  // 10. Sauvegarder
  fs.writeFileSync(BACKLOG_PATH, content);
  
  console.log(`✅ Backlog mise à jour avec projection d'atterrissage : ${landingDateStr}`);
}

updateBacklog();
