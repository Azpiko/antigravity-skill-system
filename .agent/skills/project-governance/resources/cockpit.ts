import { execSync } from 'child_process';

/**
 * Script Cockpit - Orchestrateur de Pilotage
 * Centralise l'exécution de tous les outils de suivi du projet.
 */

function run(command: string, label: string) {
  console.log(`\n\x1b[34m[Cockpit] Running ${label}...\x1b[0m`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`\x1b[32m[Cockpit] ${label} OK\x1b[0m`);
  } catch {
    console.error(`\x1b[31m[Cockpit] ${label} FAILED\x1b[0m`);
  }
}

console.log("\x1b[35m╔═══════════════════════════════════════════════╗");
console.log("║           TEELOV PROJECT COCKPIT              ║");
console.log("╚═══════════════════════════════════════════════╝\x1b[0m");

// 1. Métriques de développement
run('npm run metrics', 'Development Metrics');

// 2. Mise à jour de la vélocité
run('npm run velocity', 'Velocity Tracking');

// 3. Mise à jour du backlog
run('npm run backlog', 'Backlog Synchronization');

// 4. Rapport de statut (Dashboard)
run('npm run status', 'Project Status Dashboard');

console.log("\n\x1b[32m✅ Cockpit : Tous les rapports sont synchronisés.\x1b[0m\n");
