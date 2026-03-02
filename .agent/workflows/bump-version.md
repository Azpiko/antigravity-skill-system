---
description: Workflow - Gestion des versions (SemVer) et Changelog
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Versioning & Changelog

> [!IMPORTANT]
> Norme **SemVer 2.0.0**. Changelog en Français obligatoire.

## Phase 1 : Analyse Impact (Bump)
- **PATCH** (0.0.x) : Correctifs (Fix).
- **MINOR** (0.x.0) : Nouvelles fonctionnalités rétro-compatibles (Feat).
- **MAJOR** (x.0.0) : Changements cassants (Breaking).

## Phase 2 : MAJ package.json
// turbo
```bash
npm version [type] --no-git-tag-version
```

## Phase 3 : Rédaction Changelog
Ajouter dans `CHANGELOG.md` : `## [X.Y.Z] - YYYY-MM-DD`.
Catégories :
- **Ajouté** (Features)
- **Modifié** (Updates)
- **Corrigé** (Fixes)
- **Supprimé** (Cleanup)

## Livrables
- `package.json` et `package-lock.json` à jour.
- `CHANGELOG.md` documenté.

## Checklist
- [ ] Version `package.json` correcte.
- [ ] `CHANGELOG.md` en Français.
- [ ] `npm install` lancé (lockfile sync).

> Next Step : Release avec `/release`.