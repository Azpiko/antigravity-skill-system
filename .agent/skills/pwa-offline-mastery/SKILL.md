---
name: pwa-offline-mastery
description: Gestion rigoureuse du mode offline pour PWA Next.js (Static Export). Caching Workbox, Persistance Dexie et Outbox Pattern.
---

> **[AZPIKO DEV STANDARDS]**

# PWA Offline Mastery (Static Export)

Ce skill définit les standards pour transformer une application statique en une expérience résiliente capable de fonctionner sans réseau de manière transparente.

## 1. Stratégie de Caching (Service Worker)
En mode `export`, Next.js génère des fichiers HTML statiques. Le Service Worker doit assurer que ces fichiers sont toujours disponibles.
- **Precaching**: Utiliser Workbox pour mettre en cache tous les actifs critiques au moment du build (`out/_next/static`, `out/index.html`, etc.).
- **Routage**: Intercepter les requêtes de navigation pour servir le fichier `.html` correspondant même si l'URL ne contient pas d'extension (SPA fallback).
- **Images & Fonts**: Stratégie `Cache-First` (Cache First) avec expiration pour les ressources lourdes.

## 2. Persistance de Données (Local-First avec Dexie)
Toute la donnée métier doit vivre localement avant d'être synchronisée.
- **Source de Vérité Client**: L'application lit et écrit TOUJOURS dans **IndexedDB** (via Dexie).
- **Schéma**: Maintenir un schéma Dexie versionné et propre.
- **Sécurisation**: Nettoyage automatique des tables sensibles lors d'un logout.

## 3. Synchronisation & Outbox Pattern
Puisqu'il n'y a pas de Server Actions en mode export, la synchronisation se fait via une file d'attente.
- **The Outbox**: Créer une table `outbox` dans Dexie pour stocker les mutations (Method, URL, Body, Timestamp).
- **Auto-Sync**: Un Service Worker ou un Hook surveille l'état `online`. Dès que la connexion revient, les requêtes dans l'outbox sont envoyées séquentiellement.
- **Retry Logic**: Implémenter un backoff exponentiel pour les échecs de synchronisation.

## 4. UX Offline Premium
- **Indicateur de Connexion**: Une bannière ou un badge discret mais clair indiquant le passage en mode `offline`.
- **Feedback de Sync**: Afficher une barre de progression ou un indicateur "Sync en cours..." lors du vidage de l'outbox.
- **Lecture seule/Édition**: Griser les boutons d'action non supportés en offline si nécessaire, ou permettre l'édition et indiquer "Sera synchronisé plus tard".

## 5. Ressources
- [sw-template.js](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/pwa-offline-mastery/resources/sw-template.js) : Service Worker Workbox optimisé pour l'export.
- [useOfflineSync.ts](file:///c:/Dev/projets/antigravity-skill-system/.agent/skills/pwa-offline-mastery/resources/useOfflineSync.ts) : Hook de gestion de l'outbox.

## Checklist Offline
- [ ] Precaching Workbox configuré pour le dossier `out`.
- [ ] Routage Service Worker gère les URLs sans extension.
- [ ] Dexie utilisé comme base de données locale primaire.
- [ ] Table `outbox` opérationnelle pour les mutations.
- [ ] UI réactive au changement d'état `navigator.onLine`.
