# Instructions pour pousser le projet vers GitHub

## Problème identifié
Le dépôt GitHub ne contient actuellement que `node_modules`, `.env`, et `package.json`, mais pas les fichiers source du projet (`app/`, `components/`, `lib/`, etc.). C'est pour cela que Vercel ne reconnaît pas le projet comme Next.js.

## Solution rapide : Utiliser le script batch

1. **Double-cliquez sur `push-to-github.bat`** dans l'explorateur Windows
   - OU
2. **Exécutez dans un terminal** :
   ```cmd
   push-to-github.bat
   ```

## Solution manuelle : Commandes Git

Si le script ne fonctionne pas, ouvrez **Git Bash** ou **l'invite de commandes Windows** (pas PowerShell) dans le dossier du projet et exécutez :

```bash
# Vérifier l'état
git status

# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Vérifier ce qui a été ajouté
git status

# Créer un commit
git commit -m "Add complete Next.js project - all source files"

# Pousser vers GitHub
git push origin main
```

## Vérification

Après le push, vérifiez sur GitHub (https://github.com/burnerjohan-afk/eveildesetoilessss) que les dossiers suivants sont présents :

- ✅ `app/` (avec tous les sous-dossiers et fichiers)
- ✅ `components/`
- ✅ `lib/`
- ✅ `content/`
- ✅ `prisma/`
- ✅ `public/`
- ✅ `middleware.ts`
- ✅ `next.config.mjs`
- ✅ `tsconfig.json`
- ✅ `package.json`
- ✅ `.gitignore`
- ✅ `.eslintrc.js`

## Important

- ❌ `node_modules/` ne doit **PAS** être dans le dépôt (ignoré par `.gitignore`)
- ❌ `.env` ne doit **PAS** être dans le dépôt (ignoré par `.gitignore`)

Une fois tous les fichiers source ajoutés, Vercel pourra détecter automatiquement que c'est un projet Next.js et le déployer correctement.
