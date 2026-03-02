---
name: premium-engineering
description: Qualité "Zero Defaut", TS strict, React, Vitest.
---

> **[AZPIKO DEV STANDARDS]**

# Premium Engineering Standards

Exigences techniques pour code robuste et maintenable.

## Philosophie "Zero Defaut"
- **Build**: Interdit si échec.
- **Lint**: 0 warning.
- **Types**: TS Strict ("paranoïaque").
- **Tests**: 100% passants, métier > 80% coverage.

## Excellence TS & React
- **Strict Type**: Pas de `any` (utiliser `unknown`).
- **No Bypass**: Pas de `@ts-ignore`. `@ts-expect-error` justifié.
- **Atomicité**: 1 composant = 1 responsabilité (< 100 lignes).
- **Architecture**: Server Components défaut. Server Actions pour mutations. Hooks pour métier.

## Validation & Sécurité
- **Zod First**: Validation I/O statique.
- **Server Side**: Pas mutations client directes.
- **Zero Secrets**: Pas de credentials en dur.

## Testing Standards (Vitest/RTL)
- **Test-First**: Écrire tests avec le code.
- **Isolation**: Mock Dexie/Nav.
- **Queries**: `getByRole`.
- **Async**: `findBy` / `waitFor`.

## Ressources
- `patterns.md`: Bonnes pratiques.
- `anti-patterns.md`: Interdits.

## Checklist
- [ ] Build/Lint/Tests OK.
- [ ] Validation Zod systématique.
- [ ] UI: Skeletons, gestion erreur.
- [ ] Code DRY, commentaires FR.

## Commandes Validation
```bash
npm run type-check
npm run lint
npm test
npm run quality
```
