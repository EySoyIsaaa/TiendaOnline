@echo off
setlocal enabledelayedexpansion

echo ================================================
echo   INSTALADOR AUTOMATICO - TIENDA CAR AUDIO
echo ================================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm no esta instalado o no esta en PATH.
  echo Instala Node.js LTS desde: https://nodejs.org/
  pause
  exit /b 1
)

if not exist "servidor\package.json" (
  echo [ERROR] No se encontro servidor\package.json
  pause
  exit /b 1
)

if not exist "cliente\package.json" (
  echo [ERROR] No se encontro cliente\package.json
  pause
  exit /b 1
)

echo [1/4] Instalando dependencias del servidor...
pushd servidor
call npm install
if errorlevel 1 (
  echo [ERROR] Fallo la instalacion en servidor.
  popd
  pause
  exit /b 1
)
if not exist ".env" (
  if exist ".env.example" (
    copy /Y ".env.example" ".env" >nul
    echo [OK] Se creo servidor\.env desde .env.example
  ) else (
    echo [WARN] No existe .env.example en servidor.
  )
)
popd

echo.
echo [2/4] Instalando dependencias del cliente...
pushd cliente
call npm install
if errorlevel 1 (
  echo [ERROR] Fallo la instalacion en cliente.
  popd
  pause
  exit /b 1
)
popd

echo.
echo [3/4] Instalacion completada.
echo [4/4] Siguientes pasos:
echo    - Importa servidor\db\schema.sql en phpMyAdmin
echo    - Revisa credenciales en servidor\.env
echo    - Inicia backend:  cd servidor ^&^& npm run dev
echo    - Inicia frontend: cd cliente  ^&^& npm run dev
echo.
echo [OK] Todo listo.
pause
exit /b 0
