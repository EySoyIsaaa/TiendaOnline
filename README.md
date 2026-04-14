# Tienda Online · Audio Automotriz Premium

Proyecto fullstack escolar con frontend React (`cliente`) y backend Node/Express (`servidor`) conectado a MySQL.

## Stack usado (obligatorio)
- Frontend: React, Axios, SweetAlert2, React Router
- Backend: Node.js, Express, CORS, MySQL2
- Base de datos: MySQL/MariaDB (importable desde phpMyAdmin)

## 1) Base de datos (phpMyAdmin)
1. Abre phpMyAdmin.
2. Importa el archivo: `servidor/db/schema.sql`.
3. Se creará la base `tienda_car_audio` con tablas:
   - `categorias`
   - `productos`
   - `carrito`
4. Incluye datos seed para probar catálogo y carrito de inmediato.

## 2) Configurar backend
```bash
cd servidor
cp .env.example .env
npm install
npm run dev
```

Por defecto corre en `http://localhost:4000`.

## 3) Configurar frontend
```bash
cd cliente
npm install
npm run dev
```

Por defecto corre en `http://localhost:5173`.

## Endpoints principales
- `GET /api/categorias`
- `GET /api/productos`
- `GET /api/productos/:id`
- `GET /api/productos/categoria/:id`
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`
- `GET /api/carrito`
- `POST /api/carrito`
- `PUT /api/carrito/:id`
- `DELETE /api/carrito/:id`
- `DELETE /api/carrito`

## Vistas frontend
- Inicio
- Catálogo / Productos
- Categorías
- Detalle de producto
- Carrito
- Nosotros
- Contacto
- Admin (CRUD de productos)

## Instalación automática en Windows (.bat)
Desde la raíz del proyecto puedes ejecutar:

```bat
install_windows.bat
```

Este script ahora intenta instalar todo lo necesario:
- Node.js + npm (si no existen)
- MySQL Server (si no existe, en modo best-effort)
- dependencias en `servidor` y `cliente`
- crea `servidor/.env` a partir de `.env.example` si no existe
- opción para importar `servidor/db/schema.sql` automáticamente

