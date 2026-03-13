---
name: az-design-system-core
description: Standards pour la définition et l'implémentation du Design System (Tokens, Tailwind v4 @theme).
---

> **[AZPIKO DEV STANDARDS]**

# Design System Core Standards

Ce skill définit le contrat entre la conception visuelle (Architecte) et l'implémentation technique (Scaffold/Code).

## 1. La Matrice de Design Tokens (Contrat)
Lors de la phase `/architecte`, vous DEVEZ remplir ce template dans le `implementation_plan.md` :

```markdown
### 🎨 Design Tokens
- **Brand Name**: [Nom]
- **Palette**:
  - `primary`: [Hex/HSL] (ex: #3B82F6)
  - `secondary`: [Hex/HSL]
  - `background`: [Hex/HSL] (ex: #0F172A)
  - `accent`: [Hex/HSL]
- **Typography**:
  - `display`: [Google Font Name] (ex: Plus Jakarta Sans)
  - `body`: [Google Font Name] (ex: Inter)
- **Effects**:
  - `base-style`: [Glassmorphism | Neumorphism | Glow]
  - `radius`: [sm | md | lg | xl | full]
- **Motion**:
  - `duration`: [fast (150ms) | normal (300ms) | slow (500ms)]
```

## 2. Implémentation Tailwind v4 (@theme)
Traduire les tokens directement dans `app/globals.css` :

```css
@import "tailwindcss";

@theme {
  --color-primary: [TOKEN_PRIMARY];
  --color-secondary: [TOKEN_SECONDARY];
  --color-background: [TOKEN_BACKGROUND];
  
  --font-display: [TOKEN_DISPLAY], ui-sans-serif, system-ui;
  --font-body: [TOKEN_BODY], ui-sans-serif, system-ui;
  
  --radius-custom: [TOKEN_RADIUS];
  
  --animate-wow: fade-in 0.5s [TOKEN_CURVE];
}
```

## 3. Stratégie "Mouche du premier coup"
- **Zéro improvisation** : Le Scaffold ne doit utiliser QUE les variables `--color-*` définies.
- **Root Layout** : Injecter les fonts Google via `next/font/google` pour éviter les sauts de layout (CLS).
- **Global Styles** : Appliquer le `bg-background` et `text-foreground` sur le `body` dès le départ.

## 4. Checklist Design System
- [ ] Matrice de tokens remplie dans `implementation_plan.md`.
- [ ] Google Fonts configurées dans `layout.tsx`.
- [ ] `@theme` Tailwind v4 à jour dans `globals.css`.
- [ ] Styles `az-style-*` importés ou appliqués.
