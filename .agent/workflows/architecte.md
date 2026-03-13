---
description: Workflow Architecte pour concevoir solution technique robuste.
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Architecture & Stratégie

> [!CAUTION]
> **ZÉRO CODE D'IMPLÉMENTATION**
> Réservé à la conception. Code généré uniquement via `/code`.

## Phase 1 : Analyse & Archetype
1. Analyser le besoin métier (Visibilité vs Utilitaire vs Gestion).
2. **Matrice de Recommandation** :

| Besoin Dominant | Blueprint | Focus Technique |
|---|---|---|
| **Marketing / SEO** | `az-blueprint-site` | LCP < 1.2s, Metadata, Static export. |
| **Usage Mobile / Offline** | `az-blueprint-pwa` | Dexie (Local-first), SW, Splashscreen. |
| **Backoffice / CRUD** | `az-blueprint-saas` | Auth, Skeletons, Complex Data Management. |

3. Réf : `az-premium-conception`, `az-next-data-lifecycle`, `az-next-identity`, `az-pwa-offline-mastery`.

> [!TIP]
> Si le projet est hybride (ex: SaaS Offline), choisir le Blueprint de la contrainte la plus forte (souvent `az-blueprint-pwa`).

> L'architecte propose, USER décide (validé dans `implementation_plan.md`).

## Phase 2 : Architecture Technique & Data
- **Modèle Données**: Schémas Dexie, types TS.
- **Flux**: Transit (Action -> Context -> UI).
- **Sécurité**: Validation Zod.
- **PWA**: Impact SW, cache.

## Phase 3 : Design System & UX (Aesthetics Premium)
Réf : `az-premium-experience`.
Définir les tokens suivants dans `implementation_plan.md` :
- **Colors**: Palette (Primary, Background, Accents).
- **Typography**: Sélection Google Fonts (Header/Body).
- **Visual Style**: Glassmorphism, Neumorphism subtil, Glow effects.
- **Animations**: Courbes de bézier, micro-interactions (Hover, Click).
- **Identity**: Splash Screen (Logo, Scale, Duration).

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
