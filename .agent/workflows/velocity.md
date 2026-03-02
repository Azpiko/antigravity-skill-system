---
description: Analyse de la vélocité et production du Burndown Chart
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Analyse de Vélocité & Burndown

> [!IMPORTANT]
> Fixe standards complexité pour Antigravity et mesure la vélocité réelle vs estimée.

## Matrice de Complexité (SP)
| Type | Points | Critères |
|---|---|---|
| **Simple** | 1 SP | 1 fichier, css (15-30m) |
| **Moyen** | 3 SP | Form/Zod, Layout (45m-1h30) |
| **Complexe** | 8 SP | Feature complète, refacto (2h-4h) |

## Processus post-Release
1. **Évaluation**: Attribuer SP aux US terminées.
2. **Calcul**: `Vélocité = (Total SP) / (Heures)`. (Cible ~3-5).
3. **Burndown**: Graphique Mermaid.

## Rapport Template
- US (Titres & SP). total sprint.
- Burndown graphique.
- Analyse: Vitesse & Écarts.

## Livrables
- `.docs/4-reports/velocity-vX.X.X.md`

## Checklist
- [ ] Évaluations matricielles faites.
- [ ] Temps total cohérent.
- [ ] Rapport archivé.
