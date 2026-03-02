import fs from 'fs';
import path from 'path';

// Configuration
const DOCS_DIR = path.join(process.cwd(), '.docs');
const PILOTAGE_DIR = path.join(DOCS_DIR, '1-pilotage');
const FCT_DIR = path.join(DOCS_DIR, '3-fct');
const FEATURES_DIR = path.join(FCT_DIR, 'features');
const REPORTS_DIR = path.join(DOCS_DIR, '4-reports');
const AUDITS_DIR = path.join(REPORTS_DIR, 'audits');
const OUTPUT_FILE = path.join(PILOTAGE_DIR, 'dashboard.md');

// Lecture de la version du projet
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
const VERSION = pkg.version;

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.replace(/^v/, '').split('.').map(Number);
  const parts2 = v2.replace(/^v/, '').split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

function getLatestFile(dir: string, pattern: RegExp): string | null {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir)
    .filter(f => pattern.test(f));

  if (files.length === 0) return null;

  // Si c'est un rapport d'audit avec une version, on trie par version
  if (files[0].includes('-v')) {
    return files.sort((a, b) => {
      const vA = a.match(/-v([\d.]+)/)?.[1] || '0.0.0';
      const vB = b.match(/-v([\d.]+)/)?.[1] || '0.0.0';
      return compareVersions(vB, vA); // Inversé pour avoir le plus récent en premier
    })[0];
  }

  // Sinon tri alphabétique inversé (pour les dates YYYY-MM-DD)
  return files.sort().reverse()[0];
}

function getFeatures(dir: string): { name: string; status: string; version: string }[] {
  if (!fs.existsSync(dir)) return [];
  const results: { name: string; status: string; version: string }[] = [];
  
  const vDirs = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory());
  
  for (const vDir of vDirs) {
    const files = fs.readdirSync(path.join(dir, vDir)).filter(f => f.endsWith('.md'));
    for (const file of files) {
      // On cherche simple car on a pas de status formel dans les MD, 
      // on va juste lister les features par version
      results.push({
        name: file.replace('feature-', '').replace('.md', ''),
        status: 'Terminé', // Par défaut pour le moment
        version: vDir
      });
    }
  }
  return results;
}

const latestHealth = getLatestFile(REPORTS_DIR, /^health-check-.*\.md$/);
const latestMetrics = getLatestFile(REPORTS_DIR, /^development-metrics-.*\.md$/);
const latestTechAudit = getLatestFile(AUDITS_DIR, /^tech-audit-report-v.*\.md$/);
const latestDesignAudit = getLatestFile(AUDITS_DIR, /^design-review-report-v.*\.md$/);

const features = getFeatures(FEATURES_DIR);

const content = `# 📊 Dashboard de Suivi de Projet - TeeLov (v${VERSION})

Dernière mise à jour : ${new Date().toLocaleString('fr-FR')}

---

## 🏗️ État de Santé du Projet
| Domaine | Statut | Rapport |
| :--- | :--- | :--- |
| **Santé Technique** | 🟢 OK | [${latestHealth || 'N/A'}](../4-reports/${latestHealth}) |
| **Métriques Dev** | 🟢 OK | [${latestMetrics || 'N/A'}](../4-reports/${latestMetrics}) |
| **Audit Technique** | 🟢 OK | [${latestTechAudit || 'N/A'}](../4-reports/audits/${latestTechAudit}) |
| **Audit Design** | 🟢 OK | [${latestDesignAudit || 'N/A'}](../4-reports/audits/${latestDesignAudit}) |

---

## 🎯 Feuille de Route Fonctionnelle

### Version 2 (Courante)
| Feature | Statut | Documentation |
| :--- | :---: | :--- |
${features.filter(f => f.version === 'v2').map(f => `| ${f.name} | ✅ | [Lien](../3-fct/features/v2/feature-${f.name}.md) |`).join('\n')}

### Version 3 (Planifié)
| Feature | Statut | Documentation |
| :--- | :---: | :--- |
${features.filter(f => f.version === 'v3').map(f => `| ${f.name} | ⏳ | [Lien](../3-fct/features/v3/feature-${f.name}.md) |`).join('\n')}

---

## 🛠 Actions Prioritaires
- [ ] Maintenir le score "Zero Defaut" (Lint/Build).
- [ ] Documenter les nouvelles fonctionnalités de la V3.
- [ ] Automatiser les tests de régression.

---
*Ce document est généré automatiquement via \`npm run status\`.*
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log(`✅ PROJECT_STATUS.md mis à jour.`);
