---
description: Scaffolding Agent - Project Bootstrap & Setup
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Scaffolding & Setup

> [!IMPORTANT]
> Initialisation de projets selon archétype pour garantir une base saine.

## Phase 1 : Sélection Blueprint
- **Site**: `blueprint-site`
- **PWA**: `blueprint-pwa`
- **SAAS**: `blueprint-saas`

## Phase 2 : Bootstrap (Dossier Temporaire)
// turbo
```bash
npx create-next-app@latest ./tmp-scaffold --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*" --use-npm
```

## Phase 3 : Épuration, Migration & Git
1. Épurer: `app/page.tsx`, `globals.css`, `.svg`.
2. Migrer: de `./tmp-scaffold/` vers `./`.
3. ESM: `"type": "module"` dans `package.json`.
4. Paths: Ajuster `tsconfig.json`.
5. Gitignore: Exclure `/node_modules/` et `.next/`.
6. Nettoyer le `./tmp-scaffold/`.
7. Git Init.
// turbo
```bash
git init && git add . && git commit -m "Initial commit"
```

## Phase 4 : Setup Blueprint
Configurer spécificités Blueprint (Service Worker, Dexie, `output: 'export'`).

## Phase 5 : UI & Wahoo Effect
- Lib de base (Card, Button).
- Typographie/Layout.
- `npm run build`.

## Phase 6 : Pilotage
- Installer scripts `project-governance`.
- MAJ `package.json` (metrics, status...).

## Livrables
- Structure conforme.
- Projet compilable.
- Repo Git.

## Checklist
- [ ] Build passe.
- [ ] Manifest détecté.
- [ ] (PWA) SW/Dexie OK.
- [ ] Images défaut Next supprimées.

> Next Step : Features avec `/code`.