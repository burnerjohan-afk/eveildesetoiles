# Migration vers SQLite - Instructions

## ✅ Modifications effectuées

1. ✅ Schéma Prisma modifié pour utiliser SQLite (`provider = "sqlite"`)
2. ✅ **Enums convertis en String** (SQLite ne supporte pas les enums natifs) :
   - `MissionStatus` → `String` avec valeurs "PREPARATION", "IN_PROGRESS", "COMPLETED", "ARCHIVED"
   - `DocumentUploadedBy` → `String` avec valeurs "ADMIN", "CLIENT"
   - `DocumentCategory` → `String` avec valeurs "REQUESTED", "PROVIDED", "ATTESTATION", "OPCO", "OTHER"
   - `ActorRole` → `String` avec valeurs "ADMIN", "CLIENT"
3. ✅ Fichier `.env` mis à jour avec `DATABASE_URL="file:./prisma/dev.db"`
4. ✅ Code TypeScript adapté pour utiliser des strings au lieu d'enums

## 📋 Étapes à exécuter maintenant

Ouvrez un terminal dans le répertoire du projet et exécutez les commandes suivantes :

### 1. Générer le client Prisma

```bash
npx prisma generate
```

### 2. Créer la migration initiale

```bash
npx prisma migrate dev --name init
```

Cette commande va :
- Créer le fichier `prisma/dev.db` (base de données SQLite)
- Créer toutes les tables selon le schéma
- Générer les migrations dans `prisma/migrations/`

### 3. (Optionnel) Seed la base de données

```bash
npm run db:seed
```

Cela va créer :
- Un admin : `admin@example.com`
- Une organisation : "Crèche Les Petits Loups"
- Un client : `client@example.com`
- Une formation catalog
- Une mission
- Du personnel

## 🎉 C'est terminé !

Votre base de données SQLite est maintenant prête. Le fichier `prisma/dev.db` contient toutes vos données.

### Commandes utiles

- **Voir la base de données** : `npm run db:studio`
- **Créer une nouvelle migration** : `npx prisma migrate dev --name nom_migration`
- **Appliquer les migrations** : `npx prisma migrate deploy` (production)

## 📝 Note importante

Le fichier `prisma/dev.db` est votre base de données. **Ne le supprimez pas** sauf si vous voulez repartir de zéro.

Pour la production, vous pouvez :
- Utiliser SQLite (fichier sur le serveur)
- Ou migrer vers PostgreSQL si nécessaire

## ⚠️ Différences avec PostgreSQL

- **Pas d'enums natifs** : Les enums sont stockés comme des strings
- **Pas de contraintes de clés étrangères aussi strictes** : SQLite est plus permissif
- **Performance** : Excellent pour < 100k lignes, acceptable jusqu'à plusieurs millions
- **Pas de connexions simultanées multiples en écriture** : Suffisant pour la plupart des cas d'usage
