---
name: az-pwa-offline-mastery
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

## 2. Persistance & Synchronisation
- **Data Persistence** : Se référer à `az-data-persistence-dexie` pour la modélisation et le stockage local.
- **Sync Engine** : Se référer à `az-local-first-sync` pour l'Outbox Pattern et la réconciliation serveur.

## 3. UX Offline Premium
- **Indicateur de Connexion** : Une bannière ou un badge discret mais clair indiquant le passage en mode `offline`.
- **Feedback de Sync** : Afficher une barre de progression ou un indicateur "Sync en cours..." lors du vidage de l'outbox.

## Checklist Offline
- [ ] Precaching Workbox configuré pour le dossier `out`.
- [ ] Routage Service Worker gère les URLs sans extension.
- [ ] UI réactive au changement d'état `navigator.onLine`.
