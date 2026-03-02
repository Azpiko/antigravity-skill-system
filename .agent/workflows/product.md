---
description: Conception produit, cadrage et besoins applicatifs.
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Conception Produit

> [!IMPORTANT]
> **ORDRE OBLIGATOIRE**
> Séquentiel. Aucun code avant la validation des US (Phase 5).

## Phase 1 : Cadre
Réf: `premium-conception` pour vision/discovery.

## Phase 2 : Affinage Besoin
- 3 Questions structurées.
- Utilsateurs clés.
- Périmètre (In/Out).
- Vision.

## Phase 3 : Personas & Parcours Clés
- 2-4 personas.
- Parcours critiques de bout en bout.
- Friction / Moments de valeur.

## Phase 4 : Architecture Fonctionnelle (Epics)
- Identifier domaines.
- Epics fonctionnels.
- Priorisation (Valeur/Complexité).

## Phase 5 : Spécifications Détaillées (US)
- US format *En tant que/Je veux/Afin de*.
- Critères d'acceptation.
- Règles gestion/erreurs.
- **MAJ OBLIGATOIRE**: Ajouter US dans `.docs/1-pilotage/backlog.md` avec SP.

## Livrables (`.docs/3-fct/`)
- `PRD.md` (Vision, Epics).
- `functional_specifications.md` (Règles).
- `features/US-X.X-nom.md` pour chaque US identifiée (Détail US).
- `product_summary.md` (Synthèse).

## Checklist
- [ ] `PRD.md` clair.
- [ ] Index à jour.
- [ ] Chaque US a des SP dans backlog.
- [ ] Identité visuelle esquissée.
- [ ] Synthèse à jour.