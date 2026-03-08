---
name: next-data-lifecycle
description: Standards pour la performance (Streaming, Cache) et la synchronisation de données (IndexedDB <-> Server).
---

> **[AZPIKO DEV STANDARDS]**

# App Router & Data Lifecycle Standards

Ce skill définit comment orchestrer le cycle de vie des données pour une application rapide, réactive et capable de fonctionner en mode dégradé (Offline-first).

## 1. Performance & Rendu (Streaming)
- **Granularité**: Utiliser **React Suspense** pour streamer les composants gourmands en données.
- **Skeletons**: Fournir systématiquement des `loading.tsx` ou des fallbacks Suspense élégants (Premium Skeletons).
- **Static vs Dynamic**: Maîtriser le rendu `force-static` pour les pages de contenu et `force-dynamic` pour les tableaux de bord.

## 2. Stratégies de Cache
- **Next.js Cache**: Utiliser `revalidatePath` et `revalidateTag` pour un contrôle précis de la fraîcheur des données.
- **Request Memoization**: S'appuyer sur la mémoïsation automatique des requêtes `fetch` au sein d'un même cycle de rendu.

## 3. Sync Engine (Local-First Mastery)
C'est le pivot de l'architecture Azpiko :
- **Optimistic Updates**: Mettre à jour IndexedDB immédiatement, puis envoyer la Server Action en arrière-plan.
- **Background Sync**: Tenter de synchroniser les modifications locales dès que la connexion est rétablie.
- **Conflict Resolution**: Définir une stratégie (ex: "Last Write Wins" ou merge manuel) pour les conflits de données serveur/local.

## 4. Patterns Technique
- **Server-to-Client**: Passer les données des Server Components aux Client Components de manière optimisée (attention à la sérialisation).
- **Error Boundaries**: Isoler les erreurs de récupération de données pour ne pas faire planter toute la page.

## 5. Ressources
- [sync-engine.ts](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/next-data-lifecycle/resources/sync-engine-pattern.ts) : Pattern de synchronisation IndexedDB/Server.
- [suspense-layout.tsx](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/next-data-lifecycle/resources/suspense-layout.tsx) : Template de layout streamé haut de gamme.

## Checklist d'implémentation
- [ ] Utilisation de Suspense pour le chargement asynchrone.
- [ ] Stratégie de cache définie (revalidation).
- [ ] Mises à jour optimistes via IndexedDB.
- [ ] Mécanisme de Sync/Retry implémenté.
- [ ] Gestion des conflits de données traitée.
