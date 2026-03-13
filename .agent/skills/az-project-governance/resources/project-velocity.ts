import fs from 'fs';
import path from 'path';

const DASHBOARD_PATH = path.join(process.cwd(), '.docs', '1-pilotage', 'dashboard.md');

function calculateVelocity() {
  if (!fs.existsSync(DASHBOARD_PATH)) {
    console.error('❌ Dashboard non trouvé');
    return;
  }

  const content = fs.readFileSync(DASHBOARD_PATH, 'utf-8');
  const lines = content.split('\n');
  
  let totalPassed = 0;
  let totalEstimated = 0;

  lines.forEach(line => {
    // Format: | feature | status | priority | T. Passé | Estim. |
    const parts = line.split('|').map(p => p.trim());
    if (parts.length >= 7) {
      const passedStr = parts[5].replace('h', '');
      const estimStr = parts[6].replace('h', '');
      
      const passed = parseInt(passedStr);
      const estim = parseInt(estimStr);

      if (!isNaN(passed)) totalPassed += passed;
      if (!isNaN(estim)) totalEstimated += estim;
    }
  });

  const ratio = totalEstimated > 0 ? (totalPassed / totalEstimated).toFixed(2) : '0';
  const velocityStatus = parseFloat(ratio) <= 1 ? '🟢 Optimale' : '🟡 En tension';

  console.log(`📊 Vélocité : ${ratio} (Passé: ${totalPassed}h / Estimé: ${totalEstimated}h)`);
  console.log(`État : ${velocityStatus}`);
  
  return { ratio, totalPassed, totalEstimated, velocityStatus };
}

calculateVelocity();
