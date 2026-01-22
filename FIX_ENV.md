# Correction du problème DATABASE_URL

## Problème
Prisma ne trouve pas la variable `DATABASE_URL` dans le fichier `.env`.

## Solutions

### Solution 1 : Vérifier le format du fichier .env

Assurez-vous que votre fichier `.env` à la racine du projet contient exactement :

```env
DATABASE_URL="file:./prisma/dev.db"
```

**Important** : 
- Les guillemets doubles sont nécessaires
- Pas d'espaces autour du `=`
- Le chemin est relatif au répertoire du projet

### Solution 2 : Utiliser dotenv-cli

Si Prisma ne charge pas automatiquement le `.env`, installez `dotenv-cli` :

```bash
npm install --save-dev dotenv-cli
```

Puis utilisez-le pour vos commandes :

```bash
npx dotenv -e .env -- npx prisma generate
npx dotenv -e .env -- npx prisma migrate dev --name init
npx dotenv -e .env -- npm run db:seed
```

### Solution 3 : Définir la variable dans le terminal

Dans PowerShell :

```powershell
$env:DATABASE_URL="file:./prisma/dev.db"
npx prisma generate
npx prisma migrate dev --name init
```

### Solution 4 : Créer le dossier prisma si nécessaire

Assurez-vous que le dossier `prisma` existe :

```bash
mkdir prisma
```

## Commandes à exécuter dans l'ordre

1. **Vérifier/créer le fichier .env** :
   ```bash
   # Vérifiez que le fichier .env contient bien :
   DATABASE_URL="file:./prisma/dev.db"
   ```

2. **Générer le client Prisma** :
   ```bash
   npx prisma generate
   ```

3. **Créer la migration** :
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed la base de données** :
   ```bash
   npm run db:seed
   ```

## Vérification

Pour vérifier que tout fonctionne :

```bash
npm run db:studio
```

Cela ouvrira Prisma Studio dans votre navigateur, vous permettant de voir et modifier votre base de données.
