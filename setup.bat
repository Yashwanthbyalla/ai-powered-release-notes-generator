@echo off
echo ========================================
echo Release Notes Generator - Setup
echo ========================================
echo.

echo [1/4] Installing root dependencies...
call npm install
if errorlevel 1 (
    echo Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Installing frontend dependencies...
cd ..\frontend
call npm install --force
if errorlevel 1 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo [4/4] Checking environment file...
if exist backend\.env (
    echo backend\.env found
) else (
    echo WARNING: backend\.env not found. Please create it manually.
    echo See README.md for required environment variables.
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Install Ollama from https://ollama.ai (optional, for AI features)
echo 2. Run: ollama pull llama3.2
echo 3. Start the app: npm run dev
echo 4. Open browser: http://localhost:4200
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
pause
