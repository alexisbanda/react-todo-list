# 📝 To-do List App

> Una aplicación Full Stack para gestionar tareas con **React**, **Node.js**, **PostgreSQL** y **Docker**. Ideal para practicar y aprender desarrollo Full Stack con autenticación JWT y persistencia de datos.

---

## 🚀 Tecnologías Utilizadas

- **Frontend**: ⚛️ React + Vite
- **Backend**: 🌐 Node.js + Express
- **Base de Datos**: 🗄️ PostgreSQL
- **Autenticación**: 🔒 JWT (JSON Web Tokens)
- **Entorno**: 🐳 Docker + Docker Compose

---

## ✨ Funcionalidades Implementadas

### 👤 Gestión de Usuarios
- Registro de usuarios con contraseñas hasheadas.
- Inicio de sesión con autenticación JWT.
- Almacenamiento seguro de tokens en `localStorage`.
- Protección de rutas sensibles para usuarios autenticados.

### 📋 Gestión de Tareas
- Crear, listar, actualizar (completar/descompletar) y eliminar tareas.
- Protección de rutas de tareas con JWT.
- Interacción completa con la base de datos PostgreSQL.

### 🛠️ Características Técnicas
- **Arquitectura Modular**: Separación clara entre frontend, backend y base de datos.
- **Rutas Protegidas**: Middleware en el backend para validar tokens JWT.
- **Persistencia de Datos**: PostgreSQL para almacenamiento seguro.
- **Entorno Reproducible**: Contenedores independientes para frontend, backend y base de datos.

---

## 📂 Estructura del Proyecto

```plaintext
📦 todo-list-app
├── 📂 frontend          # React + Vite (UI)
├── 📂 backend           # Node.js + Express (API)
├── 📂 postgres          # Datos persistentes en PostgreSQL
├── 🐳 docker-compose.yml # Orquestación de servicios
└── 📜 README.md         # Documentación del proyecto
