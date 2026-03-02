---
description: Workflow d'audit et archivage systématique de la consommation de jetons.
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Audit & Archivage Jetons

Ce workflow systématise l'analyse de consommation après chaque grande étape.

## Phase 1 : Collecte des Données
- Récupérer les métriques de la session (Inputs, Outputs, Durée).
- Identifier les phases clés de travail.

## Phase 2 : Archivage JSON
Générer le snapshot structuré de la session.
// turbo
```bash
tsx scripts/archive-tokens.ts <session_id> "Description" <total_in> <total_out> <total_sec>
tsx scripts/generate-token-report.ts
```

## Phase 3 : Analyse & Lissage
- Identifier les goulots d'étranglement (phases trop longues ou trop lourdes).
- Ajuster le découpage des tâches pour les prochaines sessions.
- Mettre à jour le rapport global `.docs/4-reports/token_usage.md`.

## Livrables
- **`.docs/4-reports/tokens/session-YYYY-MM-DD-ID.json`** : Archive structurée (inclut maintenant `start_time`).

## Checklist
- [ ] Session ID correct.
- [ ] JSON valide et stocké dans le bon dossier.
- [ ] Rapport Markdown synchronisé.

> Next Step : Validation finale par le USER.