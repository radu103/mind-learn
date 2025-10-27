@echo off
chcp 65001 >nul
title MindLearn - Instalare pe Stick USB
color 0A

echo.
echo ================================================
echo      MindLearn USB Installer v1.0
echo ================================================
echo.

REM Detecteaza stick-urile USB disponibile
echo Detectand stick-urile USB disponibile...
echo.

wmic logicaldisk where "drivetype=2" get size,freespace,caption 2>nul | findstr /r "[A-Z]:"

echo.
echo Stick-urile USB de mai sus sunt disponibile.
echo.
set /p drive="Introdu litera drive-ului USB (ex: F): "

REM Valideaza input-ul
if "%drive%"=="" goto invalid_drive
if not exist "%drive%\" goto invalid_drive

echo.
echo Verificand spatiul disponibil pe %drive%...

REM Creeaza folderul MindLearn pe stick
if not exist "%drive%\MindLearn" mkdir "%drive%\MindLearn"

echo.
echo Copiind fisierele MindLearn pe stick-ul USB...
echo.

REM Copiaza toate fisierele
xcopy /E /I /Y "%~dp0*" "%drive%\MindLearn\"

REM Copiaza fisierele autorun in root-ul stick-ului
copy /Y "%~dp0autorun.inf" "%drive%\"
copy /Y "%~dp0launcher.bat" "%drive%\"

echo.
echo ================================================
echo      Instalarea s-a completat cu succes!
echo ================================================
echo.
echo MindLearn a fost instalat pe stick-ul USB %drive%
echo.
echo Ce s-a instalat:
echo [+] Aplicatia completa MindLearn
echo [+] Demo pentru prezentari
echo [+] Documentatie completa
echo [+] Sistem autorun pentru lansare automata
echo.
echo Cand introduci stick-ul in alt computer:
echo 1. Se va afisa automat meniul de lansare
echo 2. Poti alege intre aplicatia principala sau demo
echo 3. Totul functioneaza offline, fara internet
echo.
echo Stick-ul este gata pentru prezentare!
echo.
pause
goto end

:invalid_drive
echo.
echo [ERROR] Drive-ul specificat nu exista sau nu este valid!
echo Te rog sa introduci o litera valida (ex: F:)
echo.
pause
goto start

:end
echo.
echo Multumim ca folosesti MindLearn!
timeout /t 3 >nul
exit

:start
cls
goto main