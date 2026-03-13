---
description: Scaffolding Agent - Project Bootstrap & Setup
---

> **[AZPIKO DEV STANDARDS]**

# Workflow : Scaffolding & Setup

> [!IMPORTANT]
> Initialisation de projets selon archétype pour garantir une base saine.
> **Versions minimales : Next.js (latest), Tailwind CSS v4+.**

## Phase 1 : Sélection Exclusive du Blueprint
> [!CAUTION]
> **CHOIX UNIQUE OBLIGATOIRE**. Ne JAMAIS mélanger les archétypes.
- Lire le `implementation_plan.md` généré par `/architecte`.
- Identifier le Blueprint unique spécifié (ex: `az-blueprint-pwa`).
- S'y tenir strictement pour toute la durée du scaffolding.

**Options disponibles (Indivisibles) :**
- `az-blueprint-site`
- `az-blueprint-pwa`
- `az-blueprint-saas`

## Phase 2 : Bootstrap (Dossier Temporaire)
// turbo
```bash
npx create-next-app@latest ./tmp-scaffold --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*" --use-npm
```
> [!NOTE]
> S'assurer que Tailwind CSS v4+ est bien installé par défaut ou forcé via `npm install tailwindcss@next`.

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
- Lib de base (Card, Button, titre, image, liste).
- **Design System** : Appliquer strictement les tokens (couleurs, typo, effets) définis par l'architecte dans le `implementation_plan.md`.
- **NotFound** : Créer obligatoirement `app/not-found.tsx` avec un design premium (Réf : `az-premium-experience`).
- **Splash Screen** : Implémenter une Splash Screen (durée recommandée ~3s) gérant l'état initial de l'application et affichant le n° de version en dynamique.
- Typographie/Layout.
- `npm run build`.

## Phase 6 : Vérification de l'Intégrité (Anti-Régression)
> [!IMPORTANT]
> Éviter l'effet "Coquille vide sans style".
1. **CSS Check** : Vérifier que `app/globals.css` contient bien `@import "tailwindcss";` (ou directives v4).
2. **Layout Check** : Vérifier que `app/layout.tsx` importe bien `globals.css` : `import "./globals.css";`.
3. **Config Check** : Vérifier la présence de `next.config.js`, `package.json` (avec `"type": "module"`) et `postcss.config.js` (si non intégré au plugin Next.js).
4. **Build Dry-run** :
// turbo
```bash
npm run build
```

## Phase 7 : Pilotage
- Installer les scripts `az-project-governance`.
- Initialiser le `dashboard.md` dans `.docs/1-pilotage/`.

## Livrables
- Structure conforme.
- Projet compilable.
- Repo Git.

## Checklist
- [ ] Build `npm run build` SUCCESS.
- [ ] `app/layout.tsx` importe `globals.css`.
- [ ] `app/globals.css` contient les directives Tailwind v4.
- [ ] `postcss.config.js` présent ou intégré proprement.
- [ ] `app/not-found.tsx` créé et stylé.
- [ ] Splash Screen fonctionnelle.
- [ ] Manifest & Favicon présents.
- [ ] (PWA) SW/Dexie OK.
- [ ] Images défaut Next supprimées.
- [ ] Repository Git initialisé avec `.gitignore` conforme.

> Next Step : Features avec `/code`.