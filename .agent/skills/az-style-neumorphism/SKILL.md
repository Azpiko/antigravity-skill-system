---
name: az-style-neumorphism
description: Standards pour le Neumorphism subtil et élégant : Ombre douce, extrusion et design "Soft UI".
---

> **[AZPIKO DEV STANDARDS]**

# Neumorphism (Soft UI) Style Standards

Le Neumorphism (ou Soft UI) crée une illusion de formes extrudées ou encastrées dans la surface de l'interface.

## 1. Principes Fondamentaux
- **Monochromie** : L'élément doit avoir la même couleur que l'arrière-plan.
- **Double Ombre** : Utiliser une ombre sombre (en bas à droite) et une ombre claire/blanche (en haut à gauche) pour créer le relief.
- **Bordures Douces** : Utiliser des `border-radius` généreux pour accentuer l'aspect organique.

## 2. Implémentation Tailwind v4
Utilisation de multiples ombres (`shadow-[...]`) :
```html
<!-- Extrudé (Out) -->
<div class="bg-slate-100 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] rounded-3xl">
  <!-- Contenu -->
</div>

<!-- Encastré (In) -->
<div class="bg-slate-100 shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff] rounded-3xl">
  <!-- Contenu -->
</div>
```

## 3. Version Subtile (Recommandée)
Pour éviter l'aspect "trop daté", privilégier des ombres très douces et des distances courtes.
- **Shadow Spread** : Augmenter le flou (`blur`) et réduire l'opacité.

## 4. Checklist Neumorphism
- [ ] Couleur de l'élément identique à l'arrière-plan.
- [ ] Système de double ombre (Light/Dark) respecté.
- [ ] Relief cohérent avec la source de lumière (généralement Top-Left).
- [ ] Accessibilité des contrastes vérifiée.
