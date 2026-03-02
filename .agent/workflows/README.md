---
description: Guide d'utilisation et Gouvernance des Workflows Antigravity
---

> **[AZPIKO DEV STANDARDS]**

# Guide des Workflows Antigravity

Moteur de gouvernance. Procédures standardisées pour qualité "Zero Defaut".

> [!IMPORTANT]
> **Standard Premium Antigravity (v2.15)**
> 1. Structure par Phases numérotées.
> 2. Livrables explicites (`.docs/`).
> 3. Check-list de Fin.
> 4. Support `// turbo`.

## Utilisation Rapide

| Commande | Usage Principal | Focus |
|---|---|---|
| `/product` | **Conception** | PRD, Vision, User Stories. |
| `/spec` | **Spécification** | Détail fonctionnel. |
| `/architecte` | **Design Tech** | Plan d'implémentation, Data model. |
| `/code` | **Développement** | TDD, Clean Code, Validation. |
| `/quality` | **Validation** | Pipeline complet. |
| `/pilotage` | **Suivi** | Dashboard KPI, Vélocité. |
| `/debug` | **Correction** | Analyse cause racine et Hotfix. |
| `/audit-tokens` | **Optimisation** | Archivage JSON et audit de consommation. |

## Scénarios d'Enchaînement

**Nouvelle Fonctionnalité :**
`/product` ➔ `/spec` ➔ `/architecte` ➔ `/code` ➔ `/release`

**Audit & Maintenance :**
`/audit-global` ➔ `/debug` (si bugs) ➔ `/code` ➔ `/quality`

## Gouvernance & Arborescence `.docs`

1. **`1-pilotage/`**: `dashboard.md` (Santé projet).
2. **`2-architecture/`**: `implementation_plan.md`, `technical_mapping/`.
3. **`3-fct/`**: `PRD.md`, `features/`.
4. **`4-reports/`**: `walkthroughs/`, `audits/`, métriques.

## Principes Clés "Zero Defaut"
- **Pas de suppositions**: Lever flou via `/product` ou `/spec`.
- **Validation Systématique**: `npm run quality` requis avant clôture `/code`.
- **Documentation Vivante**: MAJ `dashboard.md` et `walkthrough.md`.
