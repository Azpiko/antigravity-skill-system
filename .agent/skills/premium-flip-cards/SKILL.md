---
name: premium-flip-cards
description: Standards pour cartes pivotantes (Flip Cards) : Animation 3D fluide, orientation paramétrable et design premium.
---

> **[AZPIKO DEV STANDARDS]**

# Premium Flip Cards Standards

Ce skill définit les exigences pour des cartes interactives utilisant la profondeur 3D pour révéler du contenu supplémentaire de manière élégante et mémorable.

## 1. Structure 3D "Top Niveau"
Pour garantir une animation fluide et sans artefact visuel, la structure DOM doit respecter strictement ce pattern :
- **Container**: Définit la `perspective` (ex: `1000px`).
- **Inner**: Possède `transform-style: preserve-3d` et gère la transition de `rotateY` ou `rotateX`.
- **Front & Back Faces**:
  - `backface-visibility: hidden` pour masquer la face opposée.
  - Positionnement `absolute inset-0`.
  - La face **Back** doit avoir un `rotateY(180deg)` ou `rotateX(180deg)` initial.

## 2. Design des Faces (Aesthetics)
- **Face Avant (Main Content)**:
  - Message principal clair avec une typographie premium (`font-bold`, `tracking-tight`).
  - Option d'image en arrière-plan avec un overlay subtil pour la lisibilité.
  - Glassmorphism léger (`backdrop-blur-md bg-white/10`).
- **Face Arrière (Details)**:
  - Informations complémentaires hiérarchisées.
  - Lien ou bouton "En savoir plus" (`cta`) avec un effet de survol distinctif.
  - Background contrasté mais harmonieux avec la face avant.

## 3. Paramétrage et Flexibilité
Le composant doit être hautement paramétrable :
- **Orientation**: Support du pivot **Horizontal** (Y-axis) et **Vertical** (X-axis).
- **Trigger**: Déclenchement au `hover` (desktop) ou au `click` (tactile/all-devices).
- **Vitesse**: Durée de transition ajustable (préférence : `0.6s` à `0.8s` pour un effet premium).
- **Timing Function**: Utiliser une courbe `cubic-bezier` personnalisée pour un mouvement "élastique" ou "smooth" haut de gamme.

## 4. Interactions et Feedback
- **Ombres dynamiques**: Les ombres portées (`box-shadow`) doivent évoluer durant la rotation pour simuler la profondeur.
- **Micro-interactions**: Un léger `scale` de la carte entière au survol avant le pivot renforce l'aspect interactif.
- **Réactivité**: Assurer que la hauteur de la carte est fixe ou gérée dynamiquement pour éviter les sauts de layout lors du flip.

## 5. Ressources
- [FlipCardTemplate.tsx](./resources/FlipCardTemplate.tsx) : Template React de Flip Card 3D.
- [flip-styles.css](./resources/flip-styles.css) : Utilitaires CSS pour les effets 3D.

## 5. Accessibilité
- **Clavier**: La carte doit être focusable. La touche `Enter` ou `Space` doit déclencher la rotation.
- **Sémantique**: Utiliser les attributs `aria-expanded` pour indiquer l'état de la carte.

## Checklist d'implémentation
- [ ] Structure 3D preserve-3d fonctionnelle.
- [ ] Orientation Horizontal/Vertical paramétrable.
- [ ] Design Premium (Glassmorphism, Image, Typo).
- [ ] Face arrière avec détails et CTA.
- [ ] Animation fluide via Framer Motion ou CSS pur.
- [ ] Accessibilité clavier (Focus & Keydown).
