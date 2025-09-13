@echo off
echo Starting Startup Funding Portal Backend...
echo.

echo Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is running
) else (
    echo ❌ MongoDB is not running. Starting MongoDB...
    net start MongoDB 2>NUL
    if errorlevel 1 (
        echo Please start MongoDB manually: mongod
        pause
        exit /b 1
    )
)

echo.
echo Installing dependencies...
npm install

echo.
echo Setting up database...
node completeDatabase.js

echo.
echo Starting server...
npm start