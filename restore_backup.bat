@echo off
cd /d "%~dp0"
echo === Restore minimal backup into a working repo and force-push ===

git init
if errorlevel 1 (echo [ERROR] git init failed & pause & exit /b 1)
git branch -M master

git remote get-url origin >nul 2>&1 || git remote add origin https://github.com/xucg/xucg.github.io.git

git add -A
git commit -m "restore Blowfish theme via Hugo Modules" --allow-empty
if errorlevel 1 (echo [ERROR] git commit failed & pause & exit /b 1)

git fetch origin 2>nul || echo [warn] fetch failed, continue force-push

git push --force origin master
if errorlevel 1 (echo [ERROR] git push failed - check GitHub login or credentials & pause & exit /b 1)

echo === [OK] Done: GitHub Pages and Cloudflare Pages will rebuild to this theme ===
pause
