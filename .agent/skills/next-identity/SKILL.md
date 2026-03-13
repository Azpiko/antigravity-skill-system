---
name: next-identity
description: Standards pour Authentification (Auth.js), Autorisation (RBAC) et Routes sécurisées dans Next.js.
---

> **[AZPIKO DEV STANDARDS]**

# Identity & Secure Routing Standards

Ce skill définit la structure de sécurité pour protéger les données et les fonctionnalités de l'application via des mécanismes d'identité robustes.

## 1. Authentification (Auth.js / NextAuth)
- **Providers**: Configurer les providers (OAuth, Credentials, Magic Links) dans `@/lib/auth.ts`.
- **Sessions**: Utiliser les sessions côté serveur via `auth()` dans les Server Components et `useSession()` côté client.
- **Persistance**: Synchroniser l'identité avec le profil utilisateur dans la base de données locale (**IndexedDB**) pour le mode offline (lecture seule du profil).

## 2. Autorisation & RBAC
- **Roles**: Définir les rôles (User, Admin, Editor) dans le schéma de données.
- **Server-Side Protection**: Vérifier systématiquement les droits dans les Server Components avant le rendu.
- **Client-Side Hiding**: Masquer les éléments d'UI interdits, mais ne jamais s'y fier pour la sécurité (toujours valider côté serveur).

## 3. Sécurisation des Routes (Middleware)
- **Centralisation**: Utiliser `middleware.ts` à la racine pour protéger des pans entiers de l'application (ex: `/admin/*`, `/dashboard/*`).
- **Types de Routes**:
  - **Public**: Accessibles à tous.
  - **Auth Required**: Redirection vers login si non identifié.
  - **Identified Only**: Empêcher l'accès au login si déjà connecté.

## 4. Sécurité des Données Locales
- **Encryptions**: Ne jamais stocker de secrets (tokens, mots de passe) en clair dans IndexedDB.
- **Data Cleanup**: Effacer les données sensibles d'IndexedDB lors de la déconnexion.

## 5. Ressources
- [middleware-template.ts](./resources/middleware-template.ts) : Structure de base pour le middleware de sécurité.
- [auth-hooks.ts](./resources/auth-hooks.ts) : Hooks pour vérifier les rôles et permissions.

## Checklist d'implémentation
- [ ] Auth.js configuré et fonctionnel.
- [ ] Middleware de protection des routes en place.
- [ ] Vérification des rôles (RBAC) implémentée.
- [ ] Gestion propre de la session client/serveur.
- [ ] Nettoyage des données locales au logout.
