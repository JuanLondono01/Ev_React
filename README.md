# CANINOS SABS

## 📋 Descripción

Este es un proyecto desarrollado para la empresa **Caninos SABS**, que permite un manejo completo y eficiente de la información empresarial mediante una aplicación web con frontend y backend separados.

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **React**

## 🚀 Instalación del proyecto

### 1. Clonar el repositorio

Primero, crea una carpeta en tu sistema donde alojarás tanto el frontend como la API.

```bash
git clone https://github.com/JuanLondono01/Ev_React.git
```

> Esto descargará dos carpetas principales: `server` (API) y `client` (frontend).

---

## ⚙️ Configuración

### 🔧 Backend (API - `server`)

1. Accede a la carpeta del servidor:

   ```bash
   cd server
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` con los siguientes datos (ejemplo):

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=caninos_sabs
   ```

4. Ejecuta el servidor:

   ```bash
   npm start
   ```

---

### 🖥️ Frontend (React - `client`)

1. Accede a la carpeta del cliente:

   ```bash
   cd client
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

---

## ⚠️ Notas importantes

- Si el frontend no puede acceder a la API, asegúrate de configurar correctamente CORS:
  
  1. Abre el archivo `server/app.js`.
  2. Busca la configuración de `cors()`.
  3. Asegúrate de permitir la URL desde la que estás ejecutando el frontend (ej. `http://localhost:5173`).

---

## 📄 Licencia

Este proyecto es propiedad de **Caninos SABS** y fue desarrollado con fines académicos.

