import fs from 'fs';
import path from 'path';

const TOKENS_DIR = path.join(process.cwd(), '.docs', '4-reports', 'tokens');
const REPORT_FILE = path.join(process.cwd(), '.docs', '4-reports', 'token-consommation.md');

interface Phase {
  name: string;
  input_tokens: number;
  output_tokens: number;
  duration_seconds: number;
}

interface TokenSession {
  session_id: string;
  date: string;
  start_time?: string;
  operation: string;
  metrics: {
    total_inputs: number;
    total_outputs: number;
    total_time_seconds: number;
    efficiency_ratio: number;
  };
  phases: Phase[];
}

function generateReport() {
  if (!fs.existsSync(TOKENS_DIR)) {
    console.error('Dossier tokens introuvable.');
    return;
  }

  const files = fs.readdirSync(TOKENS_DIR).filter(f => f.endsWith('.json'));
  const sessions: TokenSession[] = files.map(f => JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, f), 'utf-8')));

  // Tri par date
  sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalInputs = sessions.reduce((acc, s) => acc + s.metrics.total_inputs, 0);
  const totalOutputs = sessions.reduce((acc, s) => acc + s.metrics.total_outputs, 0);
  const totalSeconds = sessions.reduce((acc, s) => acc + s.metrics.total_time_seconds, 0);
  const avgEfficiency = totalOutputs / totalInputs;

  let md = `# 📊 Rapport de Consommation de Jetons (Global)\n\n> **[AZPIKO DEV STANDARDS]**\n\n`;
  
  md += `## 📈 Métriques Cumulées\n`;
  md += `- **Total Inputs** : ${totalInputs.toLocaleString()} tokens\n`;
  md += `- **Total Outputs** : ${totalOutputs.toLocaleString()} tokens\n`;
  md += `- **Temps Total** : ${Math.floor(totalSeconds / 60)}m ${totalSeconds % 60}s\n`;
  md += `- **Ratio d'Efficience Moyen** : ${avgEfficiency.toFixed(4)}\n\n`;

  md += `--- \n\n## 🗓️ Historique des Sessions\n\n`;
  md += `| Date | Heure | Opération | ID Session | Inputs | Outputs | Durée |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  sessions.forEach(s => {
    md += `| ${s.date} | ${s.start_time || '-'} | ${s.operation} | \`${s.session_id.slice(0, 8)}...\` | ${s.metrics.total_inputs} | ${s.metrics.total_outputs} | ${Math.floor(s.metrics.total_time_seconds / 60)}m |\n`;
  });

  md += `\n\n--- \n\n## 🎯 Analyse & Lissage (Détail par session)\n\n`;

  sessions.forEach(s => {
    const sessionTime = s.start_time ? ` à ${s.start_time}` : '';
    md += `### Session du ${s.date}${sessionTime} : ${s.operation}\n`;
    md += `*ID: \`${s.session_id}\`*\n\n`;
    md += `| Phase | Input | Output | Durée |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    s.phases.forEach(p => {
      md += `| ${p.name} | ${p.input_tokens} | ${p.output_tokens} | ${Math.floor(p.duration_seconds / 60)}m |\n`;
    });
    md += `\n`;
  });

  fs.writeFileSync(REPORT_FILE, md);
  console.log(`✅ Rapport généré : ${REPORT_FILE}`);
}

generateReport();
