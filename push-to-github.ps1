# Script PowerShell pour pousser le projet vers GitHub
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Push vers GitHub - Projet Next.js" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Verification de l'etat Git..." -ForegroundColor Yellow
git status
Write-Host ""

Write-Host "[2/4] Ajout de tous les fichiers..." -ForegroundColor Yellow
git add .
Write-Host ""

Write-Host "[3/4] Verification des fichiers ajoutes..." -ForegroundColor Yellow
git status --short
Write-Host ""

Write-Host "[4/4] Creation du commit et push vers GitHub..." -ForegroundColor Yellow
git commit -m "Add complete Next.js project - all source files for Vercel deployment"
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ATTENTION: Aucun changement a committer. Les fichiers sont peut-etre deja dans le depot." -ForegroundColor Yellow
    Write-Host ""
}
git push origin main
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "Termine!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Verifiez sur GitHub que tous les fichiers sont bien presents:" -ForegroundColor Cyan
Write-Host "- app/" -ForegroundColor White
Write-Host "- components/" -ForegroundColor White
Write-Host "- lib/" -ForegroundColor White
Write-Host "- middleware.ts" -ForegroundColor White
Write-Host "- next.config.mjs" -ForegroundColor White
Write-Host "- package.json" -ForegroundColor White
Write-Host "- tsconfig.json" -ForegroundColor White
Write-Host ""
