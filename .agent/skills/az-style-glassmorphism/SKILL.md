---
name: az-style-glassmorphism
description: Standards pour les effets de transparence, flou d'arrière-plan et bordures cristallines (Glassmorphism).
---

> **[AZPIKO DEV STANDARDS]**

# Glassmorphism Style Standards

Le Glassmorphism apporte profondeur et élégance en simulant des surfaces de verre translucides.

## 1. Principes Fondamentaux
- **Translucidité** : Utiliser des couleurs de fond avec une opacité réduite (ex: `bg-white/10` ou `bg-black/20`).
- **Flou (Frosted Glass)** : Appliquer un flou d'arrière-plan puissant via `backdrop-blur-md` à `backdrop-blur-2xl`.
- **Bordures Lumineuses** : Utiliser des bordures fines et semi-transparentes (`border border-white/20`) pour définir la forme sans l'alourdir.

## 2. Implémentation Tailwind v4
Utiliser les utilitaires de flou et d'opacité combinés :
```html
<div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
  <!-- Contenu -->
</div>
```

## 3. Best Practices Designs
- **Contraste** : S'assurer que le contenu (texte/icônes) reste lisible (`text-white` ou contrasté selon le fond).
- **Arrière-plan** : L'effet est sublimé lorsqu'il est placé sur un fond coloré ou texturé (dégradés vibrants).
- **Hiérarchie** : Varier l'intensité du flou (plus fort pour les éléments au premier plan).

## 4. Checklist Glassmorphism
- [ ] Arrière-plan semi-transparent (`bg-*/X`).
- [ ] Flou d'arrière-plan appliqué (`backdrop-blur-*`).
- [ ] Bordure fine cristalline présente.
- [ ] Lisibilité du texte préservée.
