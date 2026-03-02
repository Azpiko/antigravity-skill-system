---
description: Workflow Tech Lead Specification (Audit Codebase).
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Audit Codebase (Tech Lead)

> [!CAUTION]
> **LECTURE SEULE STRICTE**
> Audit de conformité. Aucune modification de code ou suggestion.

## Phase 1 : Contexte
- Identifier stack, dépendances critiques.
- Mapper architecture globale.
- Recenser contraintes projet.

## Phase 2 : Qualité & Robustesse
Évaluations : Clarté/SOLID, Gestion d'erreurs, Code mort.

## Phase 3 : Sécurité & Conformité
Vérifications : Zod (entrées), Données sensibles, Respect TS strict/CSS.

## Phase 4 : Documentation In-Code
- Évaluer JSDoc, Auto-explicatif.

## Livrables
- `.docs/4-reports/audits/tech-audit-report-v[version].md`

## Checklist
- [ ] Audit factuel observable.
- [ ] Aucun jugement personnel.
- [ ] Rapport stocké (`.docs`).
- [ ] Version ciblée précisée.

> Next Step : `/audit-design` ou `/debug`.