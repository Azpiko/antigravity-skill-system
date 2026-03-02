---
name: scientific-debugging
description: Méthode scientifique de debug (Observation, Isolation, Cause Racine, Non-Régression).
---

> **[AZPIKO DEV STANDARDS]**

# Scientific Debugging Standards

Discipline d'ingénierie rigoureuse. On enquête méthodiquement sans tâtonner.

## Philosophie "Detective-Engineer"
- **Évidence d'abord**: Preuves requises (logs, traces).
- **Falsifiabilité**: Toute hypothèse doit pouvoir être prouvée fausse.
- **Cause racine**: Traiter le mal, pas symptôme.

## Observation & Reproduction
- **Reproduction**: Priorité #1 (test `.test.tsx` ou script).
- **Différence**: Net vs Brut.
- **Trace-Matching**: Flux jusqu'à divergence.

## Hypothèses Falsifiables
- Lister 2-3 hypothèses.
- **Test de falsification**: "Si Z, alors X est fausse".
- **Isolation binaire**: Désactiver par bloc.

## Cause Racine (5 Pourquoi)
- Remonter la chaîne: *Pourquoi null ? -> Pourquoi echoue ? -> Pourquoi index manquant ?*
- **Action**: Créer index (Cause racine).

## Correction & Non-Régression
- **Minimalisme**: Correctif simple/ciblé.
- **Immortalisation**: Test devient permanent dans CI.
- **Verification**: `npm run quality`.

## Checklist
- [ ] Reproduit par test/étapes fiables.
- [ ] Hypothèse validée par preuve.
- [ ] Cause racine traitée.
- [ ] Régressions vérifiées (`npm run quality`).
