@echo off
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
echo ERROR: Node.js not found. Install with winget install OpenJS.NodeJS.LTS
pause
exit /b 1
)

if not exist ".protected-password" (
echo ERROR: .protected-password missing. Copy .protected-password.example and set password.
pause
exit /b 1
)

echo [1/3] npm install
call npm install --registry=https://registry.npmmirror.com
if errorlevel 1 (
echo ERROR: npm install failed
pause
exit /b 1
)

echo [2/3] build and encrypt
powershell -ExecutionPolicy Bypass -File "%~dp0build.ps1"
if errorlevel 1 (
echo ERROR: build.ps1 failed
pause
exit /b 1
)

echo [3/3] start server at http://localhost:8080
start "" "http://localhost:8080"
cd public
npx --yes serve -l 8080
if errorlevel 1 (
echo ERROR: serve failed, port 8080 may be busy
pause
)
