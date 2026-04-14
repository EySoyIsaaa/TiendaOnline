@echo off
setlocal enabledelayedexpansion

echo ============================================================
echo   INSTALADOR TOTAL - TIENDA CAR AUDIO (Windows)
echo ============================================================
echo Este script intenta instalar TODO lo necesario:
echo   1) Node.js + npm
echo   2) MySQL Server (si falta)
echo   3) Dependencias de servidor y cliente
echo   4) .env del servidor
echo   5) (Opcional) importar BD desde schema.sql
echo.

set "HAS_WINGET=0"
set "HAS_CHOCO=0"

where winget >nul 2>nul && set "HAS_WINGET=1"
where choco >nul 2>nul && set "HAS_CHOCO=1"

if "%HAS_WINGET%"=="0" if "%HAS_CHOCO%"=="0" (
  echo [ERROR] No se encontro winget ni choco para instalar prerequisitos automaticamente.
  echo Instala App Installer (winget) o Chocolatey y vuelve a ejecutar.
  pause
  exit /b 1
)

echo [PRECHECK] Gestor disponible: winget=%HAS_WINGET% choco=%HAS_CHOCO%

REM ------------------------------------------------------------
REM 1) Instalar Node.js + npm si faltan
REM ------------------------------------------------------------
where node >nul 2>nul
if errorlevel 1 (
  echo [INFO] Node.js no encontrado. Instalando...
  if "%HAS_WINGET%"=="1" (
    winget install -e --id OpenJS.NodeJS.LTS --silent --accept-source-agreements --accept-package-agreements
  ) else (
    choco install nodejs-lts -y
  )
) else (
  echo [OK] Node.js ya esta instalado.
)

set "PATH=%ProgramFiles%\nodejs;%PATH%"
where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm no quedo disponible. Cierra y abre CMD como administrador y vuelve a ejecutar.
  pause
  exit /b 1
)

echo [OK] Node y npm disponibles.
node -v
npm -v

REM ------------------------------------------------------------
REM 2) Instalar MySQL si falta (requerido por el proyecto)
REM ------------------------------------------------------------
where mysql >nul 2>nul
if errorlevel 1 (
  echo [INFO] MySQL CLI no encontrado. Intentando instalar MySQL Server...
  if "%HAS_WINGET%"=="1" (
    winget install -e --id MySQL.MySQLServer --silent --accept-source-agreements --accept-package-agreements
    if errorlevel 1 (
      winget install -e --id Oracle.MySQL --silent --accept-source-agreements --accept-package-agreements
    )
  ) else (
    choco install mysql -y
  )

  set "PATH=%ProgramFiles%\MySQL\MySQL Server 8.0\bin;%PATH%"
  set "PATH=%ProgramFiles%\MySQL\MySQL Server 8.4\bin;%PATH%"
)

where mysql >nul 2>nul
if errorlevel 1 (
  echo [WARN] No se pudo detectar mysql en PATH automaticamente.
  echo [WARN] Puedes continuar, pero luego instala/configura MySQL y phpMyAdmin manualmente.
) else (
  echo [OK] mysql detectado.
  mysql --version
)

REM ------------------------------------------------------------
REM 3) Validar estructura del proyecto
REM ------------------------------------------------------------
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

REM ------------------------------------------------------------
REM 4) Instalar dependencias de backend y frontend
REM ------------------------------------------------------------
echo.
echo [1/3] Instalando dependencias del servidor...
pushd servidor
call npm install
if errorlevel 1 (
  echo [ERROR] Fallo npm install en servidor.
  popd
  pause
  exit /b 1
)
if not exist ".env" (
  if exist ".env.example" (
    copy /Y ".env.example" ".env" >nul
    echo [OK] Se creo servidor\.env desde .env.example
  )
)
popd

echo.
echo [2/3] Instalando dependencias del cliente...
pushd cliente
call npm install
if errorlevel 1 (
  echo [ERROR] Fallo npm install en cliente.
  popd
  pause
  exit /b 1
)
popd

REM ------------------------------------------------------------
REM 5) Importar base de datos (opcional)
REM ------------------------------------------------------------
echo.
choice /M "¿Quieres importar ahora servidor\db\schema.sql en MySQL?"
if errorlevel 2 goto skipdb

where mysql >nul 2>nul
if errorlevel 1 (
  echo [WARN] mysql no esta disponible, omitiendo importacion.
  goto skipdb
)

echo Ejecutando importacion (pedira password de MySQL root)...
mysql -u root -p < servidor\db\schema.sql
if errorlevel 1 (
  echo [WARN] No se pudo importar schema.sql. Revisa usuario/password y servicio MySQL.
) else (
  echo [OK] Base de datos importada correctamente.
)

:skipdb
echo.
echo [3/3] Instalacion general completada.
echo Siguientes pasos:
echo   - Verifica credenciales en servidor\.env

echo   - Inicia backend:  cd servidor ^&^& npm run dev
echo   - Inicia frontend: cd cliente  ^&^& npm run dev
echo.
echo Si necesitas phpMyAdmin, puedes usar XAMPP/WAMP o tu stack local preferido.
echo [OK] Script finalizado.
pause
exit /b 0
