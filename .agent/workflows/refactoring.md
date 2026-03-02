---
description: Refactoring Agent - Safe Code Improvement
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Refactoring Sécurisé

> [!IMPORTANT]
> Améliorer structure interne sans changer le comportement externe. Non-régression prioritaire.

## Phase 1 : Périmètre
- Unité cible (Ne jamais tout refaire d'un coup).
- Dettes ciblées.

## Phase 2 : Sécurisation
- Vérifier couverture existante.
- Si sous-testé : écrire des caractérisations.
- Suite verte requise.

## Phase 3 : Exécution (Red-Green-Refactor)
1. Refactor atomique.
2. `npm test` passant.
3. Itérer.

## Phase 4 : Validation
// turbo
```bash
npm run quality
```
- MAJ JSDoc/Architecture.

## Livrables
- Code purifié.
- Tests MAJ.
- Rapport succinct `walkthrough.md`.

## Checklist
- [ ] Comportement externe inchangé.
- [ ] Couverture maintenue/améliorée.
- [ ] Conforme clean code.