---
name: premium-experience
description: Standards design, animations fluides, accessibilité (Glassmorphism, Framer Motion, WCAG).
---

> **[AZPIKO DEV STANDARDS]**

# Premium Experience Standards

Exigences pour interfaces élégantes, réactives et accessibles ("Wow effect").

## Philosophie "Premium First"
- **Impact Visuel**: Typographie premium (Inter/Plus Jakarta), espacements harmonieux.
- **Mobile First**: Cible tactile > 44px, poids optimisé.
- **Fluidité**: 60fps constants. Feedback < 100ms.

## Design & Glassmorphism
- **Subtilité**: Effets verre (`backdrop-blur-xl bg-background/80`).
- **Bordures/Ombres**: Fines, ombres diffuses.
- **Tokens**: EXCLUSIVEMENT variables Tailwind `@theme`.

## Motion Design (Framer Motion)
- **Splash Screen**: Flou/scale dynamique.
- **Transitions**: Fondu, léger glissement (`y: 20 -> 0`).
- **Interactions**: Scale down (`scale: 0.95`), élévation hover.
- **Staggering**: Séquencement éléments de liste.

## Accessibilité (a11y) & Sémantique
- **WCAG AA**: Contraste 4.5:1.
- **Clavier**: Focus visible (`ring-primary`), touche `Esc`.
- **Sémantique HTML**: `main`, `nav`, un seul `h1`, `alt`.

## PWA & Natif (iOS/Android)
- **Safe Areas**: Marges système via `env(safe-area-inset-*)` (encoches/barres).
- **iOS Inputs/Select**: Font >= 16px obligatoire. Masquer les styles natifs des select (`appearance-none bg-transparent`).
- **Interactions iOS**: Supprimer le flash gris au clic (`-webkit-tap-highlight-color: transparent`).
- **Scroll Control**: `overscroll-behavior-y: none` sur `body` (bloque l'effet rebond élastique/pull-to-refresh du navigateur).
- **Clavier virtuel**: Préférer `dvh` (Dynamic Viewport Height) pour s'adapter à l'apparition du clavier sans casser le layout.
- **Touch Utility**: `user-select: none` sur UI pure. `touch-action: pan-y` pour fluidifier le scroll.

## Checklist
- [ ] Effet "Wow" immédiat.
- [ ] Animations fluides et utiles.
- [ ] Accessible au clavier 100%.
- [ ] Chargements masqués par Skeletons.
