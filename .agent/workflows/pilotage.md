---
description: Suivi de l'avancement du projet
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Pilotage & Dashboard

> [!IMPORTANT]
> Garant de la visibilité projet. Synchronise le terrain avec le dashboard de pilotage.

## Phase 1 : Collecte des Métriques
Extraire les données réelles.
// turbo
```bash
npm run cockpit
```

## Phase 2 : Mise à jour de la Roadmap
- Analyser état US (`.docs/3-fct/`).
- MAJ statuts (DONE, IN PROGRESS, TODO, BLOCKED).

## Phase 3 : Actualisation du Dashboard
Mettre à jour `dashboard.md`:
- KPIs.
- Vélocité Réelle (SP/Heure) via `history` et `complexity-matrix`.
- Graphiques Mermaid (Burn-up, Burndown).
- Santé applicative.

## Livrables
- `.docs/1-pilotage/dashboard.md` (Source de vérité).

## Checklist
- [ ] Vélocité calculée (SP/Heure).
- [ ] Graphiques Mermaid OK.
- [ ] Roadmap fonctionnelle synchro avec Git.
