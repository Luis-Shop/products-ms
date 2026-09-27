# Products Microservice

Microservicio encargado de la gestión de productos, desarrollado con **NestJS**, **Prisma ORM (v7)**, **SQLite** como motor de base de datos y comunicación mediante **TCP Microservices**.

---

## 📋 Requisitos Previos

Asegúrate de tener instalado en tu sistema:

- **Node.js** (versión 20 o superior recomendada) o **Bun**
- Gestor de paquetes: **npm** o **bun**

---

## ⚙️ 1. Configuración de Variables de Entorno

El proyecto requiere variables de entorno para la configuración del puerto y la conexión a la base de datos.

1. Crea el archivo `.env` a partir de la plantilla `.env.template`:

```bash
cp .env.template .env
```

2. Verifica o ajusta los valores dentro de `.env`:

```env
PORT=3001
DATABASE_URL="file:./dev.db"
```

| Variable | Descripción | Valor por defecto |
| :--- | :--- | :--- |
| `PORT` | Puerto en el que se levantará el microservicio TCP | `3001` |
| `DATABASE_URL` | Cadena de conexión para SQLite (ruta al archivo `.db`) | `file:./dev.db` |

---

## 📦 2. Instalación de Dependencias

Instala los paquetes necesarios según el gestor que utilices:

Con **npm**:
```bash
npm install
```

Con **bun**:
```bash
bun install
```

---

## 🗄️ 3. Configuración y Levantamiento de la Base de Datos (Prisma)

El proyecto utiliza **Prisma 7** con el adaptador `@prisma/adapter-better-sqlite3` y genera el cliente en `src/generated/prisma`.

### A. Ejecutar las Migraciones

Aplica las migraciones existentes para crear el archivo de base de datos `dev.db` y las tablas correspondientes (`Product`):

Con **npm / npx**:
```bash
npx prisma migrate dev
```

Con **bun**:
```bash
bun --bun run prisma migrate dev
```

> **Nota:** Si estás inicializando desde cero o creando una nueva migración, este comando también actualizará el esquema y generará el cliente.

### B. Generar el Cliente de Prisma

Si por alguna razón necesitas regenerar el cliente de Prisma manualmente:

Con **npm / npx**:
```bash
npx prisma generate
```

Con **bun**:
```bash
bun --bun run prisma generate
```

### C. (Opcional) Visualizar y Explorar la Base de Datos

Puedes abrir **Prisma Studio** para ver e interactuar con los registros de la base de datos desde una interfaz web:

Con **npm / npx**:
```bash
npx prisma studio
```

Con **bun**:
```bash
bun --bun run prisma studio
```

Se abrirá una ventana en tu navegador (por defecto en `http://localhost:5555`).

---

## 🚀 4. Ejecución del Proyecto en Desarrollo

Una vez configuradas las variables de entorno y migrada la base de datos, ejecuta el microservicio en modo de desarrollo con recarga automática:

Con **npm**:
```bash
npm run start:dev
```

Con **bun**:
```bash
bun run start:dev
```

### Salida esperada en la consola:

Al iniciar correctamente, deberías ver mensajes similares a:

```text
[Nest] ... LOG [PrismaService] Database connected
[Nest] ... LOG [Main] Products Microservice running on port 3001
```

---

## 📡 Patrones de Mensajes (TCP)

Este microservicio se comunica mediante el transporte **TCP** de NestJS utilizando los siguientes patrones de mensajes (`@MessagePattern`):

| Patrón (`cmd`) | Payload Requerido | Descripción |
| :--- | :--- | :--- |
| `create_product` | `{ name: string, price: number }` | Crea un nuevo producto |
| `find_all_products` | `{ page?: number, limit?: number }` | Lista productos paginados activos (`available: true`) |
| `find_one_product` | `{ id: number }` | Obtiene un producto por su ID |
| `update_product` | `{ id: number, name?: string, price?: number }` | Actualiza un producto existente |
| `delete_product` | `{ id: number }` | Deshabilita de forma lógica un producto (`available: false`) |

---

## 🛠️ Comandos Adicionales

### Compilación y Producción

```bash
# Compilar TypeScript
npm run build     # o: bun run build

# Ejecutar la versión compilada
npm run start:prod # o: bun run start:prod
```

### Linter y Formato

```bash
# Revisar código con oxlint
npm run lint      # o: bun run lint

# Formatear código con Prettier
npm run format    # o: bun run format
```

### Pruebas

```bash
# Pruebas unitarias
npm run test      # o: bun run test

# Pruebas e2e
npm run test:e2e  # o: bun run test:e2e
```
