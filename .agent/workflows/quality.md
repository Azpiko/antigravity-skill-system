---
description: Unified Quality Pipeline (Lint, TypeCheck, Test, Build)
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Pipeline de Qualité (Full)

> [!IMPORTANT]
> Conformité technique complète avant release. Juge de paix.

## Phase 1 : Analyse Statique & Types
// turbo
```bash
npx eslint --fix
npm run type-check
```

## Phase 2 : Tests & Couverture
Cible: 100% coverage.
// turbo
```bash
npm run test:coverage
```

## Phase 3 : Build
Intégrité compilation.
// turbo
```bash
npm run quality
```

## Phase 4 : Rapport de Santé
Synthèse dashboard.

## Livrables
- Rapport `.docs/4-reports/`.
- Mise à jour compteurs santé `dashboard.md`.

## Checklist
- [ ] Lint OK (0 warning).
- [ ] TS OK (0 error).
- [ ] Tests OK (100% passing).
- [ ] Build OK.

> Next Step : `/pilotage` ou `/release`.