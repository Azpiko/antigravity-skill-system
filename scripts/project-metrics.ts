import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration
const REPORT_DIR = path.join(process.cwd(), '.docs', '4-reports');
const DATE = new Date().toISOString().split('T')[0];
const REPORT_FILE = path.join(REPORT_DIR, `development-metrics-${DATE}.md`);

// Helper pour exécuter des commandes shell
function runCommand(command: string): string {
  try {
    return execSync(command).toString().trim();
  } catch {
    return '';
  }
}

// Helper pour compter les fichiers
function countFiles(dir: string, extension: string, recursive: boolean = true): number {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && recursive) {
      count += countFiles(filePath, extension, recursive);
    } else if (file.endsWith(extension)) {
      count++;
    }
  }
  return count;
}

// Helper pour compter les lignes de code
function countLines(dir: string, extension: string, recursive: boolean = true): number {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && recursive) {
      count += countLines(filePath, extension, recursive);
    } else if (file.endsWith(extension)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      count += content.split('\n').length;
    }
  }
  return count;
}

// 1. Métriques Git
console.log('Récupération des métriques Git...');
const totalCommits = runCommand('git rev-list --count HEAD');
const lastCommitDate = runCommand('git log -1 --format=%cd');
const contributors = runCommand('git shortlog -sn --all');

// Calcul de l'activité des commits (alternative à uniq -c pour Windows)
const rawDates = runCommand('git log --pretty=format:%ad --date=short');
const dateCounts: Record<string, number> = {};
rawDates.split('\n').filter(Boolean).forEach(date => {
  dateCounts[date] = (dateCounts[date] || 0) + 1;
});
const commitActivity = Object.entries(dateCounts)
  .map(([date, count]) => `${count.toString().padStart(4)} ${date}`)
  .slice(0, 14)
  .join('\n');

// 2. Métriques Code
console.log('Analyse du code...');
const tsFiles = countFiles(path.join(process.cwd(), 'app'), '.ts') + countFiles(path.join(process.cwd(), 'app'), '.tsx');
const totalLines = countLines(path.join(process.cwd(), 'app'), '.ts') + countLines(path.join(process.cwd(), 'app'), '.tsx');
const componentCount = countFiles(path.join(process.cwd(), 'app'), '.tsx');
const testFiles = countFiles(path.join(process.cwd(), 'app'), '.test.ts') + countFiles(path.join(process.cwd(), 'app'), '.test.tsx');

// 3. Métriques Fonctionnelles (Documentation)
console.log('Analyse de la documentation...');
const featureDocs = countFiles(path.join(process.cwd(), '.docs', '3-fct', 'features'), '.md');
const skillsDocs = countFiles(path.join(process.cwd(), '.agent', 'skills'), 'SKILL.md');

// 4. Dette Technique
console.log('Analyse de la dette technique...');
function countPatternInFiles(dir: string, pattern: RegExp): number {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      count += countPatternInFiles(filePath, pattern);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = content.match(pattern);
      if (matches) count += matches.length;
    }
  }
  return count;
}

const todoCount = countPatternInFiles(path.join(process.cwd(), 'app'), /\/\/ TODO/g) + countPatternInFiles(path.join(process.cwd(), 'app'), /\/\/ FIXME/g);

// 4. Génération du Rapport
console.log('Génération du rapport...');

const reportContent = `# Rapport de Métriques de Développement - ${DATE}

## 1. Synthèse Globale
| Métrique | Valeur |
| :--- | :--- |
| **Total Commits** | ${totalCommits} |
| **Dernier Commit** | ${lastCommitDate} |
| **Total Fichiers TS/TSX** | ${tsFiles} |
| **Total Lignes de Code** | ${totalLines} |
| **Composants React** | ${componentCount} |
| **Tests Unitaires** | ${testFiles} |
| **Fonctionnalités Documentées** | ${featureDocs} |
| **Compétences (Skills)** | ${skillsDocs} |
| **Dette Technique (TODOs)** | ${todoCount} |

## 2. Activité des Contributeurs
\`\`\`
${contributors}
\`\`\`

## 3. Activité Récente (Git)
Graphique simplifié de l'activité des commits (nombre de commits par jour) :
\`\`\`
${commitActivity.split('\n').slice(0, 14).join('\n')} // Derniers 14 jours actifs
\`\`\`

## 4. Analyse du Code
- **Ratio Lignes / Fichier** : ${tsFiles > 0 ? Math.round(totalLines / tsFiles) : 0} lignes/fichier
- **Ratio Tests / Composants** : ${componentCount > 0 ? (testFiles / componentCount).toFixed(2) : 0}

## 5. Conclusions et Recommandations
*(À remplir manuellement ou analyser par IA)*
- La couverture de tests est-elle suffisante par rapport au nombre de composants ?
- La documentation couvre-t-elle l'ensemble des fonctionnalités implémentées ?
`;

// Assurer que le dossier existe
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

fs.writeFileSync(REPORT_FILE, reportContent);
console.log(`✅ Rapport généré : ${REPORT_FILE}`);
