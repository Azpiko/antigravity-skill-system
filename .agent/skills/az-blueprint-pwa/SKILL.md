---
name: az-blueprint-pwa
description: Archetype PWA Offline-First. Focus: Local Data, SW, Mobile UX.
---

> **[AZPIKO DEV STANDARDS]**

# Blueprint: PWA Local-First

Archetype pour applications mobiles web à fiabilité totale hors ligne.

## Objectifs
- **Offline-First**: Démarrage et utilisation hors ligne.
- **Local Data**: Dexie.js (`core-infrastructure`).
- **App-like UX**: Splash screen, transitions fluides, no elastic scroll.

## Stack Technique Requise
- **Core** : `az-core-infrastructure`.
- **Offline** : `az-pwa-offline-mastery`.
- **Persistence** : `az-data-persistence-dexie`.
- **Sync** : `az-local-first-sync`.
- **Mobile UX** : `az-mobile-ux-optimization`.

## Ressources (Templates)
Lors du scaffold d'une PWA, copier ces fichiers :
- `manifest.json` -> `public/manifest.json`
- `sw.js` -> `public/sw.js`
- `register-sw.tsx` -> `components/register-sw.tsx` (à inclure dans Layout)

## Checklist PWA
- [ ] Installation PWA (A2HS) fonctionnelle.
- [ ] Persistance données hors réseau.
- [ ] Splash screen fluide.
