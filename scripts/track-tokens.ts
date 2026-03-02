import fs from 'fs';
import path from 'path';

const REPORT_FILE = path.join(process.cwd(), '.docs', '4-reports', 'token_usage.md');

function updateTokenUsage() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: tsx track-tokens.ts "Description" <prompt_est> <completion_est> [duration_s]');
    process.exit(1);
  }

  const [description, promptEst, completionEst, durationS = '-'] = args;
  const now = new Date();
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('fr-FR');
  const timestamp = `${timeStr} ${dateStr}`;
  
  if (!fs.existsSync(REPORT_FILE)) {
    console.error('Fichier token_usage.md introuvable.');
    process.exit(1);
  }

  let content = fs.readFileSync(REPORT_FILE, 'utf-8');
  const lines = content.split('\n');
  
  // Trouver la dernière ligne du tableau pour calculer le cumul
  let total = 0;
  let lastTurnId = 0;
  
  for (const line of lines) {
    // Regex mise à jour pour capturer 7 colonnes, avec support optionnel pour l'heure dans la 1ère colonne
    const match = line.match(/\|\s*(?:[\d: ]+)?\d{2}\/\d{2}\/\d{4}\s*\|\s*(\d+)\s*\|\s*[^|]+\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*[^|]+\s*\|\s*(\d+)\s*\|/);
    if (match) {
      lastTurnId = parseInt(match[1]);
      const cumulStr = match[4].trim();
      if (!isNaN(parseInt(cumulStr))) {
        total = parseInt(cumulStr);
      }
    }
  }

  const newTurnId = lastTurnId + 1;
  const promptVal = parseInt(promptEst) || 0;
  const completionVal = parseInt(completionEst) || 0;
  const turnTotal = promptVal + completionVal;
  const newCumulativeTotal = total + turnTotal;

  const newRow = `| ${timestamp} | ${newTurnId} | ${description} | ${promptEst} | ${completionEst} | ${durationS} | ${newCumulativeTotal} |`;
  
  // Insérer la nouvelle ligne avant la section de notes si elle existe, ou à la fin
  const noteIndex = lines.findIndex(l => l.includes('> [!NOTE]'));
  if (noteIndex !== -1) {
    lines.splice(noteIndex - 1, 0, newRow);
  } else {
    lines.push(newRow);
  }

  // Mettre à jour le récapitulatif global
  let newContent = lines.join('\n');
  newContent = newContent.replace(/- \*\*Total Jetons Estimés\*\* : ~(\d+)/, `- **Total Jetons Estimés** : ~${newCumulativeTotal}`);
  newContent = newContent.replace(/- \*\*Dernière mise à jour\*\* : (?:[\d: ]+)?\d{2}\/\d{2}\/\d{4}/, `- **Dernière mise à jour** : ${timestamp}`);

  fs.writeFileSync(REPORT_FILE, newContent);
  console.log(`✅ Suivi mis à jour : Turn ${newTurnId} (+${turnTotal} tokens, ${durationS}s)`);
}

updateTokenUsage();
