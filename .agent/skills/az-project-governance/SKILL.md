---
name: az-project-governance
description: Centralisation/automatisation rapports (Métriques, Santé, Audits) et vélocité.
---

> **[AZPIKO DEV STANDARDS]**

# Project Governance Standards

Pilotage, performance et opérations garantissant transparence et prédictibilité.

## Vérité des Rapports (Standard Azpiko)
- **Backlog** : Doit impérativement suivre le format **"Rapport Audité"** (Titre, Stats Globales avec icônes, Historique par Phase, Roadmap GANTT et Matrice Fibonacci).
- **Audit** : Toute modification de la backlog doit être précédée d'un audit des fichiers `project-history.md` et `time-analysis.md`.
- **Vélocité** : La cible reste 7.0 SP/h (Benchmark Fibonacci).

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
