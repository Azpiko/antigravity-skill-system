---
name: project-governance
description: Centralisation/automatisation rapports (Métriques, Santé, Audits) et vélocité.
---

> **[AZPIKO DEV STANDARDS]**

# Project Governance Standards

Pilotage, performance et opérations garantissant transparence et prédictibilité.

## Philosophie de Pilotage
- **Vérité Data**: Les rapports sont l'unique source de vérité.
- **Prédictibilité**: Vélocité cible 7.0 SP/h.
- **Transparence**: Dashboard et Backlog à jour.
- **Complexité**: Toute tâche doit avoir des SP.

## Rapports & Métriques
- **Dev (`metrics`)**: Volume, Git, couverture test.
- **Santé (`status`)**: Build, lint, audits.
- **Audits**: Codebase/Design X.Y.0.
- **Destination**: `.docs/4-reports/`.

## Tracking Vélocité (Mode Agent)
- **Temps Actif**: Seul temps technique effectif compté.
- **SP (Fibonacci)**: 1, 2, 3, 5, 8. Redécouper si > 8.
- **Calcul**: (Complexité SP / Vélocité 7.0) * 60 min.

## Standards Opérationnels (Terminal)
- **PowerShell First**: Toujours syntaxe PowerShell.
- **Enchaînement**: `;` ou `; if ($?) { ... }` (PAS `&&`).
- **Quotes**: Simples quotes privilégiées.

Scripts requis dans `scripts/`:
- `project-metrics.ts`
- `project-status.ts`
- `project-velocity.ts`
- `project-bundle.ts`
- `update-backlog.ts`
- `cockpit.ts`
- `archive-tokens.ts`
- `generate-token-reports.ts`

## Commandes
```bash
npm run status
npm run metrics
npm run cockpit
npm run archive
npm run report
```
