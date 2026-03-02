---
name: premium-conception
description: Vision Produit, User Stories (SP) et Architecture Technique/Data amont.
---

> **[AZPIKO DEV STANDARDS]**

# Premium Conception Standards

Cadre pour la conception de fonctionnalités robustes et orientées valeur.

## Philosophie "Think First"
- **Zéro Code**: Aucun développement technique en conception.
- **Valeur Utilisateur**: Chaque feature justifie un besoin métier réel.
- **Architecture Pérenne**: Penser Data (Dexie), Offline (PWA), Sécurité (Zod).

## Vision Produit & Cadrage (`/product`)
- **Discovery**: Analyse brief, personas, parcours critiques.
- **PRD**: Vision, in/out, KPIs de succès.
- **Architecture**: Découpage en Epics.

## Spécifications Détaillées (`/spec`)
- **User Stories (US)**: Format *En tant que/Je veux/Afin de*.
- **IDs**: Séquentiels (`US-H2.4`).
- **Complexité**: Story Points (Fibonacci). Tâche < 1h. Redécouper > 8 SP.
- **Critères**: Mesurables, couvrent les cas limites.

## Architecture Technique & Data (`/architecte`)
- **Modélisation**: Schémas IndexedDB, types TS.
- **Flux Données**: Transit Data, frontières Zod.
- **Impact PWA**: Cache, offline.
- **POC**: Diagrammes Mermaid.
- **Archétype**: Recommandation du Blueprint (décision finale: USER).

## Checklist
- [ ] PRD compréhensible sans contexte oral.
- [ ] US estimées en SP.
- [ ] Nomenclature IDs respectée.
- [ ] Architecture anticipant le Local-First.
