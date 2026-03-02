import fs from 'fs';
import path from 'path';

const NEXT_DIR = path.join(process.cwd(), '.next');

function getBundleSize() {
  if (!fs.existsSync(NEXT_DIR)) {
    console.warn('⚠️ Dossier .next non trouvé. Lancez npm run build d\'abord.');
    return 'N/A';
  }

  try {
    // Utilisation de du (disk usage) sur Windows via Powershell si possible ou calcul récursif
    let totalSize = 0;
    const getAllFiles = (dir: string) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          getAllFiles(filePath);
        } else {
          totalSize += fs.statSync(filePath).size;
        }
      });
    };

    getAllFiles(NEXT_DIR);
    const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`📦 Bundle Size (.next) : ${sizeMB} MB`);
    return `${sizeMB} MB`;
  } catch (error) {
    console.error('❌ Erreur lors du calcul de la taille du bundle', error);
    return 'Error';
  }
}

getBundleSize();
