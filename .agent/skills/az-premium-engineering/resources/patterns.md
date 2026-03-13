# ✅ Teelov Design Patterns

Ce guide présente les modèles de conception recommandés pour garantir la fluidité et la maintenabilité du projet.

## 1. Composants Atomiques & Typés
Toujours séparer la logique (Hooks) de la présentation (Views).

```tsx
// ✅ BON : Séparation claire
const UserProfile = ({ id }: { id: string }) => {
  const { user, isLoading } = useUser(id); // Logique dans un hook
  
  if (isLoading) return <SkeletonProfile />;
  return <ProfileView user={user} />; // Présentation pure
};
```

## 2. Validation Préventive (Zod)
Ne jamais faire confiance aux données d'entrée. Valider à la frontière.

```tsx
// ✅ BON : Validation immédiate
const updateSettings = async (formData: FormData) => {
  const validated = settingsSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) throw new Error("Invalid data");
  // ... traitement sécurisé
};
```

## 3. Réactivité Local-First (Dexie)
L'UI doit être le reflet de la base de données locale.

```tsx
// ✅ BON : L'UI se met à jour automatiquement
const MyList = () => {
  const items = useLiveQuery(() => db.items.toArray());
  return items?.map(item => <ItemCard key={item.id} data={item} />);
};
```

## 4. Micro-interactions Framer Motion
Utiliser les variantes pour des animations cohérentes.

```tsx
// ✅ BON : Variantes réutilisables
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

<motion.div variants={fadeInUp} initial="initial" animate="animate" />
```
