---
description: Workflow complet de release (Qualité, Bump, Build, Report)
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Release Management

> [!IMPORTANT]
> Le bump de version doit précéder le build de production pour l'incorporer au bundle.

## Phase 1 : Qualité
(Sans build)
// turbo
```bash
npx eslint --fix
npm run type-check
npm run test:coverage
```

## Phase 2 : Versioning
Appliquer le bump de version avant le build.
// turbo
```bash
/bump-version
```

## Phase 3 : Build Final
// turbo
```bash
npm run build
```

## Phase 4 : Historisation & Pilotage
// turbo
```bash
/history
/audit-global
npm run cockpit
```

## Phase 5 : Finalisation
- Rapport d'audit généré dans `.docs/4-reports/`.
- MAJ `backlog.md` et `dashboard.md` (US terminées).

## Livrables
- Version stable `package.json`.
- Changelog MAJ.
- Historique vélocité `history/`.
- Audits archivés.

## Checklist
- [ ] Version build = package.json.
- [ ] Build de prod réussi.
- [ ] Historique/Vélocité recalculés.
- [ ] KPIs dashboard MAJ.
- [ ] Doc technique alignée.
