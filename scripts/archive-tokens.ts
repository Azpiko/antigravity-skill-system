import fs from 'fs';
import path from 'path';

const ARCHIVE_DIR = path.join(process.cwd(), '.docs', '4-reports', 'tokens');

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

function archiveSession() {
  const args = process.argv.slice(2);
  if (args.length < 4) {
    console.error('Usage: tsx archive-tokens.ts <session_id> <operation> <total_in> <total_out> <total_sec> [phase_name]');
    process.exit(1);
  }

  const [sessionId, operation, totalIn, totalOut, totalSec, phaseName] = args;
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const filename = `session-${dateStr}-${sessionId}.json`;
  const filepath = path.join(ARCHIVE_DIR, filename);

  let session: TokenSession;

  if (fs.existsSync(filepath)) {
    session = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    session.operation = operation;
    session.metrics = {
      total_inputs: parseInt(totalIn),
      total_outputs: parseInt(totalOut),
      total_time_seconds: parseInt(totalSec),
      efficiency_ratio: parseFloat((parseInt(totalOut) / parseInt(totalIn)).toFixed(4))
    };
  } else {
    session = {
      session_id: sessionId,
      date: dateStr,
      start_time: timeStr,
      operation,
      metrics: {
        total_inputs: parseInt(totalIn),
        total_outputs: parseInt(totalOut),
        total_time_seconds: parseInt(totalSec),
        efficiency_ratio: parseFloat((parseInt(totalOut) / parseInt(totalIn)).toFixed(4))
      },
      phases: []
    };
  }

  if (phaseName) {
    // Calculer les tokens de la phase par différence ou passer en argument ?
    // Pour simplifier, on ajoute la phase avec les totaux actuels de l'appel pour l'instant
    // ou on laisse l'utilisateur remplir les phases manuellement via le prompt.
    // Ajoutons la phase simple pour l'historique :
    session.phases.push({
      name: phaseName,
      input_tokens: parseInt(totalIn),
      output_tokens: parseInt(totalOut),
      duration_seconds: parseInt(totalSec)
    });
  }

  if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  }

  fs.writeFileSync(filepath, JSON.stringify(session, null, 2));
  console.log(`✅ Session mise à jour dans : ${filepath}`);
}

archiveSession();
