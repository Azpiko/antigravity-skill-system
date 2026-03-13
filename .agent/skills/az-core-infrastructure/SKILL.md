---
name: az-core-infrastructure
description: Architecture Local-First, DB IndexedDB (Dexie), PWA Next.js App Router.
---

> **[AZPIKO DEV STANDARDS]**

# Core Infrastructure Standards

Fondations techniques: offline, performance statique, données locales.

## Philosophie "Offline-First"
- **Zero Runtime Server**: Export statique (`output: export`).
- **IndexedDB as Truth**: Source de vérité unique pour l'UI.
- **PWA Manuelle**: Contrôle total du Service Worker.

## Next.js App Router (Static)
- **Architecture**: Server-Centric statique, Client Islands.
- **Contraintes Export**: Pas d'API dynamiques, pas `unoptimized: false` sur les images, pas `headers`/`cookies`.
- **Streaming**: `<Suspense />` et `loading.tsx`.

## Local-First & Persistence
- **Dexie.js** : Utilisation de `az-data-persistence-dexie` pour la source de vérité.
- **Réactivité** : L'UI est le reflet de l'IndexedDB.

## PWA & Résilience
- **Offline-First** : Se référer à `az-pwa-offline-mastery` pour la gestion du Service Worker et du cache Workbox.

## Checklist
- [ ] Exportable (`npm run build`) sans erreur runtime.
- [ ] IDs universels (UUID).
- [ ] Structure App Router conforme aux standards statiques.
