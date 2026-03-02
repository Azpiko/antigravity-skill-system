---
name: core-infrastructure
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

## Local-First DB (Dexie.js)
- **Réactivité**: `useLiveQuery` pour liaison UI/DB.
- **Intégrité**: Validation Zod avant insertion. UUID v4 (anti-collision).
- **Migration**: Gestion stricte `.version(X).stores()`.
- **Transactions**: `db.transaction()` pour opérations complexes.

## PWA & Caching
- **Stratégie SW**: Cache manuel (`public/sw.js`).
- **Modes**: Precache (assets critiques), Stale-While-Revalidate (images), Network-First (API).
- **Offline UI**: Indicateur hors-ligne, queue actions sortantes.

## Checklist
- [ ] Exportable (`npm run build`) sans erreur runtime.
- [ ] UI réagit immédiatement à l'IndexedDB.
- [ ] App fonctionnelle hors réseau.
- [ ] IDs universels (UUID).
