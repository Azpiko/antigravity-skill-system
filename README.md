# 🌌 Antigravity Skill System

> **Système de Gouvernance et de Standards pour le Développement Local-First Premium.**

Ce dépôt centralise l'intelligence, les standards techniques et les workflows opérationnels utilisés par les agents Antigravity pour concevoir des applications web d'exception.

---

## 🚀 Philosophie

Nous prônons une architecture **Local-First** et **Offline-First**, garantissant une réactivité instantanée et une résilience totale. Nos standards imposent une qualité "Zéro Défaut" (TS Strict, 0 Lint warning, 100% Build OK).

- **Framework** : Next.js 16+ (App Router, Static Export).
- **Style** : Tailwind CSS v4 (@theme, animations fluides).
- **Données** : IndexedDB (Dexie.js) - *Zéro localStorage*.
- **Expérience** : Design Premium, Glassmorphism, Micro-animations.

---

## 🛠️ Architecture du Projet

Le système est structuré pour maximiser la réutilisation et l'automatisation :

- **`.agent/`** : Cœur de l'intelligence.
    - `skills/` : Définitions des standards par domaine (Infra, Engineering, UX, Gouvernance).
    - `workflows/` : Processus automatisés (Slash commands) pour le pilotage et le code.
- **`.docs/`** : Documentation vivante du projet (Pilotage, Spécifications, Rapports).
- **`scripts/`** : Utilitaires TypeScript pour les métriques, la vélocité et la santé du projet.

---

## 🧠 Les Skills (Compétences)

Chaque compétence définit une série de règles et de checklists strictes :

1.  **[Core Infrastructure](.agent/skills/core-infrastructure/SKILL.md)** : Next.js statique, Dexie.js, PWA.
2.  **[Premium Engineering](.agent/skills/premium-engineering/SKILL.md)** : Qualité code, Tests Vitest, Zod validation.
3.  **[Premium Experience](.agent/skills/premium-experience/SKILL.md)** : Standards UI/UX, Accessibilité, Animations.
4.  **[Project Governance](.agent/skills/project-governance/SKILL.md)** : Pilotage par la donnée, rapports automatisés.
5.  **[Scientific Debugging](.agent/skills/scientific-debugging/SKILL.md)** : Méthodologie rigoureuse de résolution d'incidents.

---

## 📉 Commandes de Pilotage

Le projet intègre des outils de mesure de performance et de santé :

```bash
# Vérifier la santé globale (Build, Lint, Audits)
npm run status

# Générer les métriques techniques (Volume, Couverture)
npm run metrics

# Ouvrir le cockpit de pilotage
npm run cockpit

# Archiver et analyser la consommation de jetons
npm run archive
npm run report
```

---

## 📋 Conventions de Code

- **Langue** : Code en **Anglais**, Commentaires en **Français**.
- **Composants** : React fonctionnel, hooks personnalisés, atomicité.
- **Sécurité** : Validation systématique des entrées avec Zod.
- **PWA** : Gestion manuelle des Service Workers pour un contrôle total.

---

*Fait avec ❤️ par l'équipe Antigravity.*
