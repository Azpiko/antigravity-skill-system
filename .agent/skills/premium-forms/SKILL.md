---
name: premium-forms
description: Standards pour formulaires Next.js 16+ : Server Actions, Validation Zod partagée et UI Premium.
---

> **[AZPIKO DEV STANDARDS]**

# Premium Forms & Validations Standards

Ce skill définit la manière de concevoir des formulaires robustes, sécurisés et élégants dans l'écosystème Next.js App Router.

## 1. Architecture des Données & Validation
- **Single Source of Truth**: Utiliser des schémas **Zod** stockés dans un dossier partagé `@/lib/validations/`. Ces schémas sont utilisés par le client (validation temps réel) et le serveur (sécurité).
- **Type Safety**: Dériver les types des schémas Zod (`z.infer<typeof schema>`).

## 2. Server Actions & Feedback
- **Server-First**: Préférer systématiquement les **Server Actions** (`'use server'`) pour la soumission des données.
- **Progressive Enhancement**: Les formulaires doivent fonctionner même sans JS (si possible).
- **Interface de Réponse**: Utiliser un format de réponse standard : `{ success: boolean; data?: any; errors?: Record<string, string[]>; message?: string }`.
- **States**: Gérer les états `pending` via `useFormStatus` ou `useTransition` pour désactiver les boutons et afficher des loaders.

## 3. UI/UX Premium (Tailwind v4)
- **Inputs**: Design Glassmorphism (`bg-white/5 border-white/10 focus:ring-primary/50`).
- **Feedback d'erreur**: Animations fluides pour l'apparition des messages d'erreur (`framer-motion` scale/fade).
- **Loading states**: Boutons avec spinners ou skeletons intégrés.
- **Success states**: Utiliser des Toasts ou des micro-animations de validation.

## 4. Patterns de Formulaires Complexes
- **Multi-étapes**: Gérer l'état de l'étape courante dans l'URL ou un état local persistant.
- **Calculs en temps réel**: Utiliser `useForm` (React Hook Form) pour les formulaires riches nécessitant des interactions complexes avant soumission.

## 5. Ressources
- [useFormAction.ts](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/premium-forms/resources/useFormAction.ts) : Hook pour simplifier la gestion des Server Actions.
- [FormInputs.tsx](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/premium-forms/resources/FormInputs.tsx) : Bibliothèque de composants d'inputs premium.

## Checklist d'implémentation
- [ ] Schéma Zod défini et partagé.
- [ ] Server Action avec validation côté serveur.
- [ ] Gestion des états de chargement (pending).
- [ ] Feedback visuel des erreurs par champ.
- [ ] Design conforme (Glassmorphism, animations).
- [ ] Accessibilité (Labels, ARIA labels).
