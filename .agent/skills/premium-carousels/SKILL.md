---
name: premium-carousels
description: Standards pour carrousels premium : Interactifs, hautement paramétrables (Auto-play, Parallaxe, Loops) et au design unique.
---

> **[AZPIKO DEV STANDARDS]**

# Premium Carousels Standards

Ce skill définit les exigences pour des carrousels qui transcendent le simple défilement d'images pour devenir des composants d'interface immersifs et sophistiqués.

## 1. Philosophie "Immersive & Unique"
- **Glassmorphism**: Les contrôles (flèches, pagination) doivent utiliser des effets de flou (`backdrop-blur`) et des bordures subtiles.
- **Profondeur & Parallaxe**: Intégrer des effets de parallaxe sur le contenu des slides lors du défilement.
- **Transitions**: Éviter les coupures nettes. Utiliser des courbes de bézier personnalisées pour des mouvements fluides et organiques.

## 2. Paramétrage Avancé
Tout carrousel premium doit exposer les réglages suivants :
- **Auto-play & Progress**: Indicateur visuel (ligne de progression ou cercle) du temps restant avant le prochain slide. Pause au survol (hover).
- **Looping**: Mode boucle infinie fluide sans saut visuel.
- **Direction**: Support du défilement horizontal et vertical.
- **Densité**: Nombre de slides visibles par vue (breakpoints responsive).
- **Sensibilité**: Force du drag et friction pour les interactions tactiles.

## 3. Interactions et Feedback "Wow Effect"
- **Scale Dynamique**: L'élément central (actif) doit avoir un léger `scale` (ex: 1.05) ou une opacité supérieure aux éléments adjacents.
- **Cursor interaction**: Changer le curseur en `grab` / `grabbing` lors de l'interaction manuelle.
- **Pagination Innovante**: Utiliser des points (dots) dont la taille évolue selon la proximité du slide actif, ou des barres numérotées élégantes.
- **Staggering**: Les éléments à l'intérieur d'un slide doivent apparaître avec un léger décalage (stagger) à l'entrée.

## 4. Patterns Techniques
- **Framer Motion**: Privilégier `AnimatePresence` pour les transitions de sortie et `dragContent` pour les interactions.
- **React Hooks**: Encapsuler la logique de navigation dans un hook réutilisable (`useCarouselControl`).
- **Responsive**: Adaptation stricte via Tailwind (ex: `slides-per-view-1` on mobile, `3` on desktop).

## 5. Ressources
- [useCarousel.ts](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/premium-carousels/resources/useCarousel.ts) : Hook de contrôle du carrousel.
- [CarouselTemplate.tsx](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/premium-carousels/resources/CarouselTemplate.tsx) : Template React de carrousel immersif.

## 5. Accessibilité
- **Clavier**: Support complet des flèches gauche/droite et barre d'espace.
- **ARIA**: Utiliser `role="region"`, `aria-roledescription="carousel"`, et `aria-live="polite"` pour les slides.

## Checklist d'implémentation
- [ ] Paramètres Auto-play, Loop et Direction fonctionnels.
- [ ] Indicateur de progression (Visual Timer).
- [ ] Effet de Glassmorphism sur l'UI du carrousel.
- [ ] Animation de type Parallaxe ou Scale dynamique.
- [ ] Support complet du Drag/Touch.
- [ ] Accessibilité clavier et ARIA validée.
