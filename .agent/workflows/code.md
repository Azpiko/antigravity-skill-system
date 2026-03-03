---
description: Workflow - Génération code "Zero Defaut" (Clean Code, TDD, Validation).
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Développement Logiciel

> [!IMPORTANT]
> Garantie : **Zero Build Error**, **Zero Lint Warning**, **100% Tests Passants**.

## Phase 1 : Sources
Consulter : `premium-engineering`, `premium-experience`, `core-infrastructure`.

## Phase 2 : Planification (Think first)
1. **Découpage** : Composants, hooks, utils.
2. **Test** : Stratégie de validation métier.
3. **Réutilisation** : Vérifier existant (`lucide-react`, `date-fns`).

## Phase 3 : Implémentation
Règles strictes :
- Pas de `any` -> `unknown` ou type précis.
- Pas de `@ts-ignore` sans justification FR.
- Pas de `console.log` -> `logger`.
- Pas de `alert` -> modale premium.
- Pas de redondance de code.
- **Test-First**.

## Phase 4 : Validation "Zero Defaut"
Ne JAMAIS clore sans succès de la CI locale.
// turbo
```bash
npm run quality
```
Corriger immédiatement si échec.

## Livrables
- Code source propre/typé.
- Tests (unit/integration).
- `.docs/4-reports/walkthroughs/walkthrough.md` (Preuve visuelle/logs).

## Checklist
- [ ] `npm run build` OK.
- [ ] Aucun warning ESLint / TypeScript.
- [ ] `npm test` 100% passant.
- [ ] `CHANGELOG.md` à jour (si besoin).

> Next Step : `/quality` ou `/release`.