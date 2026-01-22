@echo off
chcp 65001 >nul
echo ========================================
echo Push vers GitHub - Projet Next.js
echo ========================================
echo.

echo [1/4] Verification de l'etat Git...
git status
echo.

echo [2/4] Ajout de tous les fichiers...
git add .
echo.

echo [3/4] Verification des fichiers ajoutes...
git status --short
echo.

echo [4/4] Creation du commit et push vers GitHub...
git commit -m "Add complete Next.js project - all source files for Vercel deployment"
if %errorlevel% neq 0 (
    echo.
    echo ATTENTION: Aucun changement a committer. Les fichiers sont peut-etre deja dans le depot.
    echo.
)
git push origin main
echo.

echo ========================================
echo Termine!
echo ========================================
echo.
echo Verifiez sur GitHub que tous les fichiers sont bien presents:
echo - app/
echo - components/
echo - lib/
echo - middleware.ts
echo - next.config.mjs
echo - package.json
echo - tsconfig.json
echo.
pause
