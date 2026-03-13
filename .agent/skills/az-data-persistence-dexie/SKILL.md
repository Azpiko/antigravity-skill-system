---
name: az-data-persistence-dexie
description: Standards pour la persistance locale via Dexie.js (IndexedDB). Schéma, migrations et réactivité.
---

> **[AZPIKO DEV STANDARDS]**

# Data Persistence (Dexie.js) Standards

Ce skill définit l'utilisation stricte de Dexie.js comme moteur de stockage primaire.

## 1. Modélisation et Schéma
- **Versionning** : Toujours utiliser `.version(X).stores()` pour chaque modification.
- **Nomenclature** : Noms de tables en minuscule, pluriel.
- **Clés** : Utiliser `++id` pour l'auto-incrément ou des UUID pour les synchro multi-sources.

## 2. Réactivité (useLiveQuery)
L'UI doit être "branchée" sur la base de données.
- **Hooks** : Utiliser `useLiveQuery` pour que les composants se rafraîchissent automatiquement lors d'une mutation.
- **Performance** : Limiter les requêtes lourdes dans les composants de présentation.

## 3. Intégrité des Données
- **Zod Middleware** : Valider les objets avec Zod avant toute insertion (`db.table.add(schema.parse(data))`).
- **Transactions** : Utiliser `db.transaction('rw', ...)` pour garantir l'atomicité lors de modifications sur plusieurs tables.

## 4. Checklist Persistence
- [ ] Schéma Dexie centralisé et versionné.
- [ ] Utilisation de `useLiveQuery` pour la réactivité UI.
- [ ] Validation Zod systématique avant stockage.
- [ ] IDs UUID utilisés pour les entités synchronisables.
