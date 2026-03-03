---
description: Rédaction de spécifications fonctionnelles détaillées.
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Spécifications Fonctionnelles

> [!IMPORTANT]
> Produire une doc exploitable par l'ingénierie.
> Rôle: PO | Scope: 1 US. Arborescence `.docs/3-fct/features/`.

## Phase 1 : Nomenclature
Réf: `premium-conception`.
- Lire `functional_architecture.md`.
- Déduire le prochain ID (ex: `US-H2.4`). Pas de `#1`.

## Phase 2 : Clarification
- Reformuler (Valeur).
- Cas nominaux / limites.
- 3 questions pour affiner le besoin

## Phase 3 : Définition Fonctionnelle & Estimation (SP)
- Contexte/Objectif.
- Règles de gestion.
- Critères d'acceptation.
- **Estimation SP (Fibonacci)**: 1, 2, 3, 5, 8, 13, 21. > 21 à redécouper.

## Phase 4 : UX/UI & PWA
- Effet Wow.
- Touch Utility (> 44px).
- Offline-First.
- Accessibilité.

## Livrables
- `.docs/3-fct/features/feature-[name].md` (Avec ID).
- `.docs/3-fct/functional_architecture.md` (MAJ obligatoire).

## Checklist
- [ ] `functional_architecture.md` lu et mis à jour.
- [ ] IDs cohérents (`US-X.Y`).
- [ ] 1 feature / doc.
- [ ] Chaque US a son estimation (SP).
- [ ] Compréhensible sans oral par dév.

> Next Step : `/architecte`.