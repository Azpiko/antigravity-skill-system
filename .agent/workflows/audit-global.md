---
description: Workflow Génère rapports qualité, métriques, audits.
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Audit Global & Rapports

Centralisation et horodatage (`YYYY-MM-DD`) des rapports de santé.

## Phase 1 : Métriques de Développement
Générer statistiques via scripts (commits, vélocité).
// turbo
```bash
npm run metrics
```

## Phase 2 : Audits Techniques & Design
Lancer `/audit-codebase` et `/audit-design`.

## Phase 3 : Santé & Sécurité
Vérifier dépendances et build.
// turbo
```bash
npx eslint --fix
npm run build
npm outdated
```

## Phase 4 : Mise à jour Changelog
- Compiler changements (Feat, Fix, Refactor).
- MAJ `CHANGELOG.md` version.

## Livrables (`.docs/4-reports/`)
- `development-metrics-YYYY-MM-DD.md`
- `health-check-YYYY-MM-DD.md`
- `audits/tech-audit-report-v[version].md`

## Checklist
- [ ] Horodatage YYYY-MM-DD appliqué.
- [ ] Version alignée `package.json`.
- [ ] Dashboard MAJ (`npm run status`).
- [ ] Changelog à jour.

> Next Step : `/pilotage` pour maj dashboard.