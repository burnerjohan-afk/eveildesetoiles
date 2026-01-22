# Solution au problème DATABASE_URL

## Problème
Prisma ne trouve pas la variable `DATABASE_URL` même si elle est dans le fichier `.env`.

## Solution rapide

### Option 1 : Définir la variable dans le terminal (recommandé pour tester)

Dans PowerShell, exécutez :

```powershell
$env:DATABASE_URL="file:./prisma/dev.db"
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

### Option 2 : Installer dotenv et mettre à jour

1. **Installer dotenv** :
   ```bash
   npm install dotenv
   ```

2. **Le seed.ts a déjà été mis à jour** pour charger dotenv automatiquement.

3. **Exécuter les commandes** :
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run db:seed
   ```

### Option 3 : Vérifier le format du .env

Assurez-vous que votre fichier `.env` à la racine contient :

```env
DATABASE_URL="file:./prisma/dev.db"
```

**Important** :
- Les guillemets doubles sont nécessaires
- Pas d'espaces autour du `=`
- Le chemin est relatif : `./prisma/dev.db` (pas `/prisma/dev.db`)

## Vérification

Pour vérifier que la variable est bien chargée, vous pouvez créer un fichier de test :

```javascript
// test-env.js
require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
```

Puis exécutez :
```bash
node test-env.js
```

Vous devriez voir : `DATABASE_URL: file:./prisma/dev.db`

## Commandes complètes dans l'ordre

```bash
# 1. Installer dotenv (si pas déjà fait)
npm install dotenv

# 2. Générer le client Prisma
npx prisma generate

# 3. Créer la migration et la base de données
npx prisma migrate dev --name init

# 4. Seed la base de données
npm run db:seed
```

## Si ça ne fonctionne toujours pas

1. **Vérifiez que le fichier `.env` est à la racine du projet** (même niveau que `package.json`)
2. **Vérifiez qu'il n'y a pas de caractères invisibles** dans le fichier `.env`
3. **Essayez avec le chemin absolu** :
   ```env
   DATABASE_URL="file:C:/Eveil des étoiles/prisma/dev.db"
   ```
   (Remplacez par votre chemin réel)
