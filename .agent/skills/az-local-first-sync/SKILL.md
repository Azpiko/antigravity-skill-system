---
name: az-local-first-sync
description: Standards pour la synchronisation de données : Outbox Pattern, Conflict Resolution et Background Sync.
---

> **[AZPIKO DEV STANDARDS]**

# Local-First Sync Standards

Ce skill centralise toute la logique permettant de maintenir la cohérence entre les données locales (IndexedDB) et le serveur.

## 1. Outbox Pattern
Puisqu'il n'y a pas de mutations directes en offline, toutes les actions sont différées.
- **Table Outbox** : Stocker `{ id, method, url, body, timestamp, status, attempts }`.
- **Enregistrement** : Toute action (POST/PUT/DELETE) doit d'abord être inscrite dans l'outbox avant tentative d'envoi.
- **Background Worker** : Un script ou Service Worker dépile l'outbox dès que `navigator.onLine` est vrai.

## 2. Stratégies de Synchronisation
- **Optimistic Updates** : L'UI reflète le changement localement AVANT que la sync serveur ne soit confirmée.
- **Retry Policy** : Implémenter un backoff exponentiel pour les erreurs réseau (503, timeout).
- **Batching** : Envoyer plusieurs mutations en une seule fois si possible pour limiter les requêtes.

## 3. Conflict Resolution
Définir une politique claire par domaine métier :
- **LWW (Last Write Wins)** : Le plus récent écrase l'ancien (Défaut).
- **Merge** : Fusion intelligente des champs (pour les objets complexes).
- **User Choice** : Demander à l'utilisateur en cas de conflit critique.

## 4. Checklist Sync
- [ ] Table `outbox` opérationnelle dans Dexie.
- [ ] Mises à jour optimistes systématiques.
- [ ] Mécanisme de Sync/Retry géré au rétablissement de la connexion.
- [ ] Stratégie de conflit explicitée dans le code.
