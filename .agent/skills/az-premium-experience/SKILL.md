---
name: az-premium-experience
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
- **Splash Screen**: Flou/scale dynamique ("Wow effect").
- **Transitions**: Fondu, léger glissement (`y: 20 -> 0`).
- **Interactions**: Scale down (`scale: 0.95`), élévation hover.
- **Staggering**: Séquencement éléments de liste.

## Accessibilité (a11y) & Sémantique
- **WCAG AA**: Contraste 4.5:1.
- **Clavier**: Focus visible (`ring-primary`), touche `Esc`.
- **Sémantique HTML**: `main`, `nav`, un seul `h1`, `alt`.

## 4. Optimisation Mobile UX
- Se référer au skill dédié : `az-mobile-ux-optimization` pour les spécificités iOS, Safe Areas et comportements tactiles avancés.

## Checklist
- [ ] Effet "Wow" immédiat.
- [ ] Animations fluides et utiles.
- [ ] Accessible au clavier 100%.
- [ ] Chargements masqués par Skeletons.
