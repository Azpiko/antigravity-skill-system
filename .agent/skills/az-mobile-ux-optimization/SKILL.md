---
name: az-mobile-ux-optimization
description: Optimisations spécifiques pour l'expérience mobile (iOS/Android) : Safe areas, tap behaviors, virtual keyboards.
---

> **[AZPIKO DEV STANDARDS]**

# Mobile UX Optimization Standards

Ce skill regroupe les correctifs et optimisations indispensables pour que la PWA ressemble à une application native.

## 1. Adaptation Système (iOS Focus)
- **Safe Areas** : Utiliser les variables CSS `env(safe-area-inset-*)` pour éviter que le contenu ne soit masqué par l'encoche ou la barre de navigation.
- **Inputs** : `font-size: 16px` minimum sur iOS pour éviter le zoom automatique au focus.
- **Tap Highlight** : `-webkit-tap-highlight-color: transparent` pour supprimer le flash gris au clic.

## 2. Gestions des Comportements
- **Rebond Elastique** : `overscroll-behavior-y: none` sur `body` pour bloquer le pull-to-refresh natif des navigateurs.
- **Hauteur Dynamique** : Utiliser `dvh` (Dynamic Viewport Height) pour que le layout s'ajuste à l'apparition du clavier virtuel.
- **Touch Utility** : `user-select: none` sur les éléments d'interface purs.

## 3. Checklist Mobile UX
- [ ] Safe areas respectées (marges haut/bas).
- [ ] Pas de zoom forcé sur les inputs (font >= 16px).
- [ ] Pull-to-refresh natif désactivé si non souhaité.
- [ ] Layout résilient au clavier virtuel (usage de `dvh`).
