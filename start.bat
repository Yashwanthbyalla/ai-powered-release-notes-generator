@echo off
echo Starting Release Notes Generator...
echo.
echo Backend will start on: http://localhost:3000
echo Frontend will start on: http://localhost:4200
echo.
echo Press Ctrl+C to stop both services
echo.

start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 >nul
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting in separate windows...
echo Close those windows to stop the servers.
echo.
pause
