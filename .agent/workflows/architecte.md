---
description: Workflow Architecte pour concevoir solution technique robuste.
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Architecture & Stratégie

> [!CAUTION]
> **ZÉRO CODE D'IMPLÉMENTATION**
> Réservé à la conception. Code généré uniquement via `/code`.

## Phase 1 : Analyse & Archetype
1. Analyser besoin métier.
2. **Recommander Blueprint** :
   - `blueprint-site`: Landing/Vitrines.
   - `blueprint-pwa`: Apps mobiles.
   - `blueprint-saas`: Dashboards.
3. Réf : `premium-conception` (Section 3).

> L'architecte propose, USER décide (validé dans `implementation_plan.md`).

## Phase 2 : Architecture Technique & Data
- **Modèle Données**: Schémas Dexie, types TS.
- **Flux**: Transit (Action -> Context -> UI).
- **Sécurité**: Validation Zod.
- **PWA**: Impact SW, cache.

## Phase 3 : Design System & UX
Trancher : Splash Screen, Thème (Couleurs/Mode), Micro-interactions.

## Phase 4 : Stratégie (Phasing)
Découpage atomique : Setup, Core Logic, UI Components, Integration, Polish.

## Livrables
- `.docs/2-architecture/implementation_plan.md`
- `.docs/2-architecture/task.md` (< 1h, stimulées en SP).
- `.docs/1-pilotage/dashboard.md` (MAJ KPIs).

## Checklist
- [ ] `implementation_plan.md` complet (Review Required).
- [ ] `task.md` = tâches granulaires.
- [ ] Schémas Mermaid inclus.