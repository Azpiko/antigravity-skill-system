---
name: premium-lists
description: Standards pour listes premium : Paginées (10-100), Triables, Filtrables et Recherche Fulltext.
---

> **[AZPIKO DEV STANDARDS]**

# Premium Lists Standards

Ce skill définit les exigences pour des listes de données robustes, performantes et élégantes, offrant une expérience utilisateur fluide même avec des volumes de données importants.

## 1. Structure Spécifique et UX
- **Layout**: Utiliser un conteneur avec `overflow-hidden` et des effets de Glassmorphism (`backdrop-blur`).
- **Header de Liste**: Regrouper la recherche fulltext et les boutons d'actions/filtres.
- **Skeletons**: Afficher des Skeletons animés pendant le chargement des données pour éviter les sauts de layout.
- **Empty State**: Concevoir une vue "Aucun résultat" élégante avec une illustration ou une icône Lucide et un bouton pour réinitialiser les filtres.

## 2. Pagination & Densité de Données
- **Options de lignes**: Proposer systématiquement les paliers : **10, 15, 30, 100** items par page.
- **Contrôles**: Situés en bas de liste (Sticky footer si nécessaire).
- **Indicateurs**: Afficher clairement "Éléments X à Y sur Z".
- **Navigation**: Boutons Précédent/Suivant et accès direct aux pages si Z > 5 pages.

## 3. Tri (Sorting)
- **Interaction**: Chaque en-tête de colonne cliquable doit déclencher un tri.
- **Indicateurs Visuels**: Utiliser des icônes Lucide (`ChevronUp`, `ChevronDown`, `ChevronsUpDown`) pour indiquer l'état de tri (ASC, DESC, None).
- **Logique**: Le tri doit être stable. Préférer le tri côté serveur/IndexedDB pour les gros volumes, ou `useMemo` pour les petits sets.

## 4. Filtrage & Recherche Fulltext
- **Recherche Fulltext**: 
  - Champ de saisie proéminent avec icône `Search`.
  - Implémenter un `debounce` de 300ms pour éviter de surcharger les calculs/requêtes.
  - Surligner (Highlight) les termes recherchés dans les résultats si possible.
- **Filtres Avancés**:
  - Filtrer sur les colonnes "métier" les plus importantes (statut, date, catégorie).
  - Utiliser des `Badges` pour afficher les filtres actifs.
  - Option "Tout effacer" toujours accessible si des filtres sont actifs.

## 5. Patterns Technique (Tailwind v4)
- **Tableau**: Utiliser `table-auto` pour le contenu, ou un layout Flex/Grid pour une meilleure réactivité mobile.
- **Hover States**: `hover:bg-accent/50 transition-colors` sur les lignes.
- **Animations**: Utiliser `stagger` de Framer Motion pour l'apparition des lignes.

## 6. Ressources
- [usePagination.ts](./resources/usePagination.ts) : Hook de logique de pagination/tri.
- [ListTemplate.tsx](./resources/ListTemplate.tsx) : Template React de liste premium.

## Checklist d'implémentation
- [ ] Pagination fonctionnelle (10, 15, 30, 100).
- [ ] Tri actif sur toutes les colonnes pertinentes.
- [ ] Recherche fulltext avec debounce.
- [ ] Filtres métiers implémentés.
- [ ] Design premium et responsive (Glassmorphism).
- [ ] Skeletons de chargement.
