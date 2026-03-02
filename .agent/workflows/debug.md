---
description: Workflow - Debugging Specification v1.2
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Debugging & Hotfix

> [!IMPORTANT]
> Traité comme de l'ingénierie. Observer avant d'interpréter, corriger la cause racine.

## Phase 1 : Rigueur & Méthode
Consulter `scientific-debugging` (investigation/isolation).

## Phase 2 : Investigation
- Hypothèses falsifiables (par probabilité).
- Approche binaire (réduire le scope).
- Tracer le flux de données.

## Phase 3 : Cause Racine
- Les "5 Pourquoi".
- Distinguer bug vs effet secondaire.
- Preuve observable (logs/debugger).

## Phase 4 : Correctif & Non-Régression
- Correctif minimal/durable.
- Test de non-régression.
// turbo
```bash
npm run quality
```

## Livrables
- `.docs/4-reports/debug-report-v[version].md`
- `.docs/4-reports/walkthroughs/walkthrough-debug-fix.md`

## Checklist
- [ ] Bug non reproductible.
- [ ] 0 régression/warning introduite.
- [ ] Test automatisé ajouté.

> Next Step : Clôture via `/pilotage`.