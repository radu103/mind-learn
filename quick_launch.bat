@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title MindLearn - Demo Quick Launcher
color 0E

REM Banner simplu
echo.
echo ================================================================================
echo.
echo    ███    ███ ██ ███    ██ ██████  ██      ███████  █████  ██████  ███    ██ 
echo    ████  ████ ██ ████   ██ ██   ██ ██      ██      ██   ██ ██   ██ ████   ██ 
echo    ██ ████ ██ ██ ██ ██  ██ ██   ██ ██      █████   ███████ ██████  ██ ██  ██ 
echo    ██  ██  ██ ██ ██  ██ ██ ██   ██ ██      ██      ██   ██ ██   ██ ██  ██ ██ 
echo    ██      ██ ██ ██   ████ ██████  ███████ ███████ ██   ██ ██   ██ ██   ████ 
echo.
echo                       Aplicatia Inteligenta de Invatare
echo.
echo ================================================================================
echo.

REM Detectează calea curentă
set "CURRENT_DIR=%~dp0"

REM Afiseaza informatii despre aplicatie
echo Despre MindLearn:
echo    • Prima aplicatie care "invata" cum functioneaza creierul tau
echo    • Se adapteaza automat la stilul tau de invatare
echo    • Formeaza echipe complementare prin algoritmi AI
echo    • Detecteaza starea emotionala si adapteaza continutul
echo.
echo ==================================================================================
echo.

:main_menu
echo OPTIUNI DE LANSARE:
echo.
echo    1. DEMO PENTRU PREZENTARE (Recomandat pentru TIC)
echo    2. APLICATIA COMPLETA (Experienta full)
echo    3. SERVER LOCAL (Pentru functionalitate maxima)
echo    4. DESCHIDE FOLDERUL
echo    5. DOCUMENTATIA
echo    6. IESIRE
echo.
echo ==================================================================================
echo.

set /p "choice=Alege optiunea (1-6): "

if "%choice%"=="1" goto demo_presentation
if "%choice%"=="2" goto full_app
if "%choice%"=="3" goto local_server
if "%choice%"=="4" goto open_folder
if "%choice%"=="5" goto documentation
if "%choice%"=="6" goto exit
echo.
echo Optiune invalida! Te rog sa alegi 1-6.
echo.
pause
cls
goto main_menu

:demo_presentation
cls
echo.
echo LANSAND DEMO PENTRU PREZENTARE...
echo.
echo ==================================================================================
echo GHID RAPID PENTRU PREZENTARE:
echo.
echo 1. Incepe cu explicatia problemei (stiluri diferite de invatare)
echo 2. Demonstreaza mini-jocurile live pe scena
echo 3. Arata adaptarea emotionala (schimba starile)
echo 4. Explica algoritmul de echipe complementare
echo 5. Prezinta dashboard-ul profesorilor
echo 6. Sublinaza rezultatele: +40%% eficienta!
echo.
echo TIP: Foloseste F11 pentru modul fullscreen!
echo ==================================================================================
echo.

REM Gaseste si lanseaza browserul
call :find_browser
if defined BROWSER (
    echo Lansand in %BROWSER_NAME%...
    %BROWSER% "%CURRENT_DIR%demo.html" --new-window --start-maximized
) else (
    echo Lansand cu browserul implicit...
    start "" "%CURRENT_DIR%demo.html"
)

echo.
echo Demo-ul a fost lansat! Prezentare de succes!
goto end_pause

:full_app
cls
echo.
echo LANSAND APLICATIA COMPLETA...
echo.
echo ==================================================================================
echo EXPERIENTA COMPLETA MINDLEARN:
echo.
echo • Fa scanarea personalizata cu mini-jocurile
echo • Testeaza adaptarea la diferite stari emotionale
echo • Exploreaza sistemul de echipe complementare
echo • Vezi dashboard-ul pentru profesori
echo • Interactioneaza cu asistentul AI virtual
echo.
echo TIP: Completeaza scanarea pentru experienta personalizata!
echo ==================================================================================
echo.

call :find_browser
if defined BROWSER (
    echo Lansand in %BROWSER_NAME%...
    %BROWSER% "%CURRENT_DIR%index.html" --new-window --start-maximized
) else (
    echo Lansand cu browserul implicit...
    start "" "%CURRENT_DIR%index.html"
)

echo.
echo Aplicatia a fost lansata! Bucura-te de invatare!
goto end_pause

:local_server
cls
echo.
echo PORNIND SERVER LOCAL...
echo.

REM Verifica daca Python este instalat
python --version >nul 2>&1
if %errorlevel%==0 (
    echo Python detectat! Pornind server HTTP...
    echo.
    echo ==================================================================================
    echo SERVER INFORMATION:
    echo    • URL Local: http://localhost:8000
    echo    • Pentru demo: http://localhost:8000/demo.html
    echo    • Pentru aplicatia completa: http://localhost:8000/index.html
    echo.
    echo Serverul va rula in background. Pentru a-l opri, inchide aceasta fereastra.
    echo ==================================================================================
    echo.
    
    echo Pornind server-ul si deschizand browser-ul...
    
    REM Porneste server-ul in fundal
    start /min python -m http.server 8000
    
    REM Asteapta putin ca server-ul sa porneasca
    timeout /t 3 /nobreak >nul
    
    REM Deschide browser-ul
    call :find_browser
    if defined BROWSER (
        echo Deschizand in %BROWSER_NAME%...
        %BROWSER% "http://localhost:8000" --new-window
    ) else (
        start "" "http://localhost:8000"
    )
    
    echo.
    echo Server pornit cu succes! Acceseaza http://localhost:8000
    echo.
    echo Nu inchide aceasta fereastra daca vrei sa pastrezi server-ul activ!
    echo.
    pause
    
) else (
    echo Python nu este instalat pe acest computer!
    echo.
    echo Revenind la lansarea directa...
    timeout /t 2 /nobreak >nul
    goto full_app
)
goto end

:open_folder
echo.
echo Deschizand folderul aplicatiei...
explorer "%CURRENT_DIR%"
goto end_pause

:documentation
echo.
echo Deschizand documentatia...
if exist "%CURRENT_DIR%README.md" (
    start "" "%CURRENT_DIR%README.md"
) else (
    echo Fisierul README.md nu a fost gasit!
)
if exist "%CURRENT_DIR%USB_INSTALL_GUIDE.md" (
    start "" "%CURRENT_DIR%USB_INSTALL_GUIDE.md"
)
goto end_pause

:exit
cls
echo.
echo ==================================================================================
echo.
echo     Multumim ca ai folosit MindLearn!
echo.
echo        "Invata mai inteligent, nu mai greu!"
echo.
echo     Succes la prezentarea ta de TIC!
echo.
echo ==================================================================================
echo.
timeout /t 3 /nobreak >nul
exit /b

:find_browser
set "BROWSER="
set "BROWSER_NAME="

REM Cauta Chrome
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
    set "BROWSER_NAME=Google Chrome"
    goto browser_found
)
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
    set "BROWSER_NAME=Google Chrome"
    goto browser_found
)

REM Cauta Edge
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
    set "BROWSER_NAME=Microsoft Edge"
    goto browser_found
)
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
    set "BROWSER_NAME=Microsoft Edge"
    goto browser_found
)

REM Cauta Firefox
if exist "%ProgramFiles%\Mozilla Firefox\firefox.exe" (
    set "BROWSER=%ProgramFiles%\Mozilla Firefox\firefox.exe"
    set "BROWSER_NAME=Mozilla Firefox"
    goto browser_found
)
if exist "%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe"
    set "BROWSER_NAME=Mozilla Firefox"
    goto browser_found
)

:browser_found
exit /b

:end_pause
echo.
echo Pentru a relansa aplicatia, ruleaza din nou acest fisier!
echo.
pause
goto end

:end
exit /b