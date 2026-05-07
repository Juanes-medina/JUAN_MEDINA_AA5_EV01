# API Servicios Web

## Descripción
Proyecto desarrollado para la evidencia GA7-220501096-AA5-EV01.

La API permite:
- Registrar usuarios
- Iniciar sesión

## Tecnologías utilizadas
- Node.js
- Express
- MySQL
- bcryptjs
- Git y GitHub

## Instalación

```bash
npm install
```

## Ejecutar proyecto

```bash
npm run dev
```

## Base de datos

```sql
CREATE DATABASE api_servicios_web;

USE api_servicios_web;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

## Endpoints

### Registro
POST /api/registro

### Login
POST /api/login
