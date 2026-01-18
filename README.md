# 📦 Expenses API – Backend

Backend para la gestión de gastos (**expenses**) construido con **NestJS**, **TypeORM** y **PostgreSQL**.

Incluye:

- Configuración por variables de entorno
- Migraciones
- Seeders manuales
- Endpoints para consultar gastos y categorías

---

## 🚀 Tecnologías

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- typeorm-extension (seeders)
- dotenv

---

## 📁 Estructura del proyecto

```txt
src/
├── common/
│   └── interfaces/
│       └── paginated-response.interface.ts
├── config/
│   └── database.config.ts
├── database/
│   ├── migrations/
│   └── seeds/
│       └── expenses.seeder.ts
├── modules/
│   └── expenses/
│       ├── entities/
│       │   └── expense.entity.ts
│       ├── dto/
│       │   ├── create-expense.dto.ts
│       │   ├── expense-response.dto.ts
│       │   ├── pagination.dto.ts
│       │   ├── search-expenses.query.dto.ts
│       │   └── update-expense.dto.ts
│       ├── expenses.controller.ts
│       ├── expenses.module.ts
│       └── expenses.service.ts
├── app.module.ts
├── data-source.ts
└── main.ts
```

---

## ⚙️ Requisitos previos

- Node.js **>= 18**
- PostgreSQL
- npm o yarn

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgresql
DB_NAME=expenses

CLIENT_ORIGIN=http://localhost:3000
```

---

## 📦 Instalación

```bash
npm install
```

---

## ▶️ Levantar el proyecto

```bash
npm run start:dev
```

La API estará disponible en:

```
http://localhost:3001
```

---

## 🗄️ Base de datos

### Migraciones

Ejecuta las migraciones para crear la estructura de la base de datos:

```bash
npm run typeorm migration:run
```

---

## 🌱 Seeders (datos iniciales de `expenses`)

Este proyecto utiliza **typeorm-extension** para poblar la base de datos con datos iniciales.

```bash
npm run seed:run
```

Esto insertará datos de ejemplo en la tabla `expenses`.

### ✔ Características de los seeders

- Seeders manuales
- No duplican datos (idempotentes)
- Ideales para entornos de desarrollo

---

## 📌 Endpoints principales

### 🔹 Obtener todos los gastos (paginado)

**GET** `/expenses`

Query params:

- `page` (number)
- `limit` (number)

---

### 🔹 Buscar gastos (filtros + paginación)

**GET** `/expenses/search`

Query params (opcionales):

- `description`
- `category`
- `minAmount`
- `maxAmount`
- `page`
- `limit`

---

### 🔹 Obtener un gasto por ID

**GET** `/expenses/:id`

---

### 🔹 Crear un gasto

**POST** `/expenses`

Body (JSON):

```json
{
  "description": "Groceries",
  "amount": 500,
  "category": "Food"
}
```

---

### 🔹 Actualizar un gasto

**PUT** `/expenses/:id`

Body (JSON):

```json
{
  "description": "Updated description",
  "amount": 600,
  "category": "Food"
}
```

---

### 🔹 Eliminar un gasto

**DELETE** `/expenses/:id`

Respuesta:

- `204 No Content`

---

### 🔹 Obtener categorías únicas (ordenadas alfabéticamente)

**GET** `/expenses/categories`

Respuesta ejemplo:

```json
[
  "Education",
  "Entertainment",
  "Food",
  "Health",
  "Home",
  "Transport",
  "Utilities"
]
```

👤 Autor

**Adiel Hernández**
Backend Developer
