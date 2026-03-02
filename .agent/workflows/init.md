---
description: Workflow - Initialisation structure documentaire (.docs).
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Initialisation Projet

> [!CAUTION]
> **ZÉRO CODE APPLICATIF**
> Réservé à l'architecture documentaire (`.docs/` & `scripts/`).

## Phase 1 : Arborescence
// turbo
```bash
mkdir .docs
mkdir .docs/1-pilotage
mkdir .docs/2-architecture
mkdir .docs/3-fct
mkdir .docs/3-fct/features
mkdir .docs/4-reports
mkdir scripts
```

## Phase 2 : Fichiers Clés
- `README.md` (Global).
- `1-pilotage/dashboard.md` (Suivi).
- `1-pilotage/backlog.md` (Backlog).

## Phase 3 : Configuration Pilotage
1. Copier les 9 scripts depuis $SKILL `project-governance/resources/` vers `scripts/`.
2. `npm install -D tsx`
3. Ajouter au `package.json` :
   - `"metrics": "tsx scripts/project-metrics.ts"`
   - `"status": "tsx scripts/project-status.ts"`
   - `"velocity": "tsx scripts/project-velocity.ts"`
   - `"backlog": "tsx scripts/update-backlog.ts"`
   - `"cockpit": "tsx scripts/cockpit.ts"`
   - `"track": "tsx scripts/track-tokens.ts"`
   - `"archive": "tsx scripts/archive-tokens.ts"`
   - `"report": "tsx scripts/generate-token-reports.ts"`

## Livrables
- Arborescence `.docs/` & `scripts/`.
- 9 Scripts pilotage.

## Checklist
- [ ] Dossiers créés.
- [ ] Scripts `.ts` copiés.
- [ ] `package.json` mis à jour.

> Next Step : Vision produit avec `/product`.
