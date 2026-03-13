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
  const projectName = pkg.name || 'Project';

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
    title Projection d'Atterrissage ${projectName} V3
    dateFormat  DD/MM/YYYY
    axisFormat  %d/%m
    section Développement
    Terminé (${totalSP} SP)           :done, a1, 24/01/2026, ${dateStr}
    Roadmap V3 (${remainingSP} SP)         :active, a2, ${dateStr}, ${weeksNeeded}w
    section Atterrissage
    Date estimée : milestone, m1, ${landingDateStr}, 0d
\`\`\`
`;

  // 7. Reconstruction intégrale du contenu pour forcer le style standard
  const standardHeader = `📋 Backlog ${projectName} - Rapport Audité
Ce document recense l'historique audité des fonctionnalités et la roadmap. Les données sont validées d'après project-history.md et time-analysis.md.

📈 Statistiques Globales (Auditées)
- **Version Actuelle** : ${version}
- **Total Story Points (SP)** : ${totalSP}
- **Temps Total Passé (Réel)** : ~${totalHoursPassé.toFixed(1)}h
- **Vélocité Moyenne** : ${velocity.toFixed(2)} SP/h
- **Efficacité vs Benchmark** : 🟢 Excellente (Suite de Fibonacci)

🛠 Historique des Réalisations (v1.0.0 → ${version})
Réalisations Terminées
| Module / Feature | Phase | SP | Temps Estimé | Temps Passé | Statut |
|---|---|---|---|---|---|
`;

  // On tente de conserver le tableau existant des réalisations ou de l'injecter si non présent
  const historyMatch = content.match(/\| Module \/ Feature \| Phase \| SP \|[\s\S]*?(?=\n\n|##|🚀)/);
  let realizationsTable = historyMatch ? historyMatch[0].trim() : `| Déposez vos réalisations ici | - | 0 | 0h | 0h | ✅ |`;
  
  // S'assurer que le tableau contient les headers corrects
  if (!realizationsTable.includes('| Module / Feature | Phase | SP |')) {
    realizationsTable = `| Module / Feature | Phase | SP | Temps Estimé | Temps Passé | Statut |\n` + realizationsTable;
  }

  // Mises à jour de la Roadmap (on garde l'existant ou on crée des placeholders)
  const roadmapV2 = content.match(/🚀 Roadmap V2[\s\S]*?(?=\n\n|##|🚀)/) ? content.match(/🚀 Roadmap V2[\s\S]*?(?=\n\n|##|🚀)/)[0].trim() : `🚀 Roadmap V2 — Planification\n| Feature | US | SP | Estimation | Priorité |\n|---|---|---|---|---|`;
  const roadmapV3 = content.match(/🚀 Roadmap V3[\s\S]*?(?=\n\n|##|🎯)/) ? content.match(/🚀 Roadmap V3[\s\S]*?(?=\n\n|##|🎯)/)[0].trim() : `🚀 Roadmap V3 (Prévue)\n| Feature | SP | Estimation | Priorité |\n|---|---|---|---|`;

  const projectionSection = `## 🎯 Projection d'Atterrissage
- **SP Restants** : ${remainingSP} SP
- **Charge estimée** : ~${hoursNeeded.toFixed(1)}h
- **Capacité de production** : ${CAPACITY_PER_WEEK}h/semaine
- **Date d'atterrissage estimée** : **${landingDateStr}**

${projectionMermaid}

## 📝 Matrice de Complexité (Fibonacci)
| Niveau | Label | Points | Description |
|---|---|---|---|
| Simple - | (s-) | 1 | Micro-fix, texte, meta-data. |
| Simple | (s) | 2 | UI mineure, style CSS simple. |
| Simple + | (s+) | 3 | Petit composant UI, logic de base. |
| Moyen - | (m-) | 5 | Formulaire simple, petite migration. |
| Moyen | (m) | 8 | Composant métier, feature standard. |
| Moyen + | (m+) | 13 | Feature avec logique métier avancée. |
| Complexe - | (c-) | 21 | Intégration API, logique complexe. |
| Complexe | (c) | 34 | Architecture, Refonte majeure, Moteur. |
| Complexe +| (c+) | 55 | Système complet, Migration critique. |

*Backlog auditée et validée le ${dateStr}*
`;

  const newContent = `${standardHeader}\n${realizationsTable}\n\n| **TOTAL AUDITÉ** | | **${totalSP}** | **${totalHoursEst.toFixed(1)}h** | **${totalHoursPassé.toFixed(1)}h** | |\n\n${roadmapV2}\n\n${roadmapV3}\n\n${projectionSection}`;

  // 10. Sauvegarder
  fs.writeFileSync(BACKLOG_PATH, newContent);
  
  console.log(`✅ Backlog mise à jour avec projection d'atterrissage : ${landingDateStr}`);
}

updateBacklog();
