# ❌ Teelov Anti-Patterns

Liste des pratiques strictement interdites pour maintenir le standard "Zero Defaut".

## 1. Utilisation du `localStorage`
**Pourquoi ?** Synchrone, bloque le thread principal, pas de types, pas de réactivité.
* **❌ MAUVAIS :** `localStorage.setItem('user', data)`
* **✅ SOLUTION :** Utiliser IndexedDB via Dexie (`db.settings.put(data)`).

## 2. Logique Métier dans les Vues
**Pourquoi ?** Rends les composants illisibles et difficiles à tester.
* **❌ MAUVAIS :** Faire des calculs complexes ou des accès DB au milieu du JSX.
* **✅ SOLUTION :** Extraire dans un hook `useCustomLogic()` ou un utilitaire.

## 3. Styles Inline ou Ad-hoc
**Pourquoi ?** Casse la cohérence du design system et rend le mode sombre difficile.
* **❌ MAUVAIS :** `style={{ color: 'red' }}` ou des classes arbitraires `text-[#ff0000]`.
* **✅ SOLUTION :** Utiliser les semantic tokens de Tailwind ou `@theme`.

## 4. Prop Drilling Excessif
**Pourquoi ?** Rend le code rigide et difficile à refactoriser.
* **❌ MAUVAIS :** Passer une prop à travers 5 composants intermédiaires.
* **✅ SOLUTION :** Utiliser le Context API (avec parcimonie) ou la réactivité de `useLiveQuery`.

## 5. Bypassing TypeScript
**Pourquoi ?** Annule tout l'intérêt de la sécurité du code.
* **❌ MAUVAIS :** Utiliser `any` ou `@ts-ignore`.
* **✅ SOLUTION :** Définir des interfaces ou utiliser `unknown` avec un type guard.
