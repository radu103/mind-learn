@echo off
chcp 65001 >nul
title MindLearn - Aplicatia Inteligenta de Invatare
color 0B

echo.
echo ================================================
echo         MindLearn Launcher v1.0
echo    Aplicatia Inteligenta de Invatare
echo ================================================
echo.
echo Lansând aplicația MindLearn...
echo.

REM Detectează calea curentă
set CURRENT_DIR=%~dp0

REM Încearcă să găsească browserul instalat
set BROWSER=
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set BROWSER="%ProgramFiles%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set BROWSER="%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    set BROWSER="%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    set BROWSER="%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
) else if exist "%ProgramFiles%\Mozilla Firefox\firefox.exe" (
    set BROWSER="%ProgramFiles%\Mozilla Firefox\firefox.exe"
) else if exist "%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe" (
    set BROWSER="%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe"
)

REM Afișează meniul
echo Alege o optiune:
echo.
echo 1. Lanseaza aplicatia principala (index.html)
echo 2. Lanseaza demo pentru prezentare (demo.html)
echo 3. Porneste server local (Python)
echo 4. Deschide folder aplicatie
echo 5. Citeste documentatia (README.md)
echo 6. Iesire
echo.
set /p choice="Introdu optiunea (1-6): "

if "%choice%"=="1" goto main_app
if "%choice%"=="2" goto demo_app
if "%choice%"=="3" goto local_server
if "%choice%"=="4" goto open_folder
if "%choice%"=="5" goto readme
if "%choice%"=="6" goto exit
goto invalid

:main_app
echo.
echo Lansand aplicatia principala MindLearn...
if defined BROWSER (
    %BROWSER% "%CURRENT_DIR%index.html" --new-window --kiosk
) else (
    start "" "%CURRENT_DIR%index.html"
)
goto end

:demo_app
echo.
echo Lansand demo pentru prezentare...
if defined BROWSER (
    %BROWSER% "%CURRENT_DIR%demo.html" --new-window --kiosk
) else (
    start "" "%CURRENT_DIR%demo.html"
)
goto end

:local_server
echo.
echo Verificand daca Python este instalat...
python --version >nul 2>&1
if %errorlevel%==0 (
    echo Python gasit! Pornind server local...
    echo.
    echo Server pornit pe: http://localhost:8000
    echo Aplicatia se va deschide automat in browser...
    echo.
    echo Pentru a opri server-ul, apasa Ctrl+C
    echo.
    
    REM Porneste server-ul in background si deschide browserul
    start /min python -m http.server 8000
    timeout /t 3 >nul
    
    if defined BROWSER (
        %BROWSER% "http://localhost:8000" --new-window
    ) else (
        start "" "http://localhost:8000"
    )
    
    echo Apasa orice tasta pentru a continua...
    pause >nul
) else (
    echo Python nu este instalat!
    echo Lansand aplicatia direct din fisiere...
    goto main_app
)
goto end

:open_folder
echo.
echo Deschizand folderul aplicatiei...
explorer "%CURRENT_DIR%"
goto end

:readme
echo.
echo Deschizand documentatia...
if exist "%CURRENT_DIR%README.md" (
    start "" "%CURRENT_DIR%README.md"
) else (
    echo Fisierul README.md nu a fost gasit!
    pause
)
goto end

:invalid
echo.
echo Optiune invalida! Incearca din nou.
echo.
pause
cls
goto start

:exit
echo.
echo La revedere! Multumim ca folosesti MindLearn!
echo.
timeout /t 2 >nul
exit

:end
echo.
echo ================================================
echo     MindLearn a fost lansat cu succes!
echo ================================================
echo.
echo Bucura-te de experienta de invatare personalizata!
echo.
echo Apasa orice tasta pentru a inchide launcher-ul...
pause >nul
exit

:start
goto main_menu