---
name: az-style-glow-effects
description: Standards pour les effets de luminescence, auras et néons premiums (Glow effects).
---

> **[AZPIKO DEV STANDARDS]**

# Glow Effects Style Standards

Les effets de Glow apportent une touche de modernité et de dynamisme en simulant une source de lumière émanant des éléments.

## 1. Principes Fondamentaux
- **Lueur Externe (Drop Shadow)** : Utiliser des ombres colorées avec une grande dispersion.
- **Aura d'Arrière-plan** : Placer un élément flou (`blur-3xl`) derrière l'objet principal.
- **Luminosité du Texte** : Appliquer un `text-shadow` léger pour faire vibrer la typographie.

## 2. Implémentation Tailwind v4
Exemple d'aura lumineuse derrière un bouton ou une carte :
```html
<div class="relative group">
  <!-- Aura -->
  <div class="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
  
  <!-- Élément principal -->
  <button class="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
    <span class="text-primary pr-6">Premium Action</span>
  </button>
</div>
```

## 3. Glow Animé (Pulse)
Pour les éléments critiques (CTA), utiliser une animation de pulsation de la lueur.
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(var(--primary), 0.5); }
  50% { box-shadow: 0 0 20px rgba(var(--primary), 0.8); }
}
```

## 4. Checklist Glow
- [ ] Lueur cohérente avec la couleur de la marque.
- [ ] Utilisation de gradients pour plus de profondeur.
- [ ] Intensité modérée pour éviter la fatigue visuelle.
- [ ] État `hover` accentuant l'effet de lumière.
