# 📚 StudyHub - Centro de Estudios Online

StudyHub es una plataforma web moderna diseñada para gestionar y compartir resúmenes académicos de forma organizada. Permite a los estudiantes acceder fácilmente a material de estudio categorizado por curso y unidad, mientras que los administradores pueden subir y gestionar el contenido de manera sencilla.

## ✨ Características principales

- 📖 Biblioteca de resúmenes organizada por curso y unidad
- 🔐 Sistema de autenticación de usuarios
- 👨‍💼 Panel administrativo para gestión de contenido
- 📱 Diseño responsive (funciona en móviles, tablets y computadoras)
- 🌐 Interfaz bilingüe (Español/Inglés)
- 📄 Visualización de PDFs directamente en el navegador

---

## 🚀 Guía de Instalación Paso a Paso

### Requisitos previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- Un editor de código (recomendado: Visual Studio Code)

### Paso 1: Descargar el proyecto

1. Descarga el proyecto completo en tu computadora
2. Descomprime la carpeta (si está comprimida)
3. Abre la carpeta del proyecto en tu explorador de archivos

### Paso 2: Configurar el servidor (Backend)

1. Abre una **terminal** o **símbolo del sistema** en la carpeta del proyecto
2. Navega a la carpeta del servidor:
```bash
   cd servidor
```

3. Instala las dependencias necesarias:
```bash
   npm install
```

4. Crea un archivo llamado `.env` dentro de la carpeta `servidor` con el siguiente contenido:
```
   PORT=4000
   JWT_SECRET=mi_clave_super_secreta_12345
```
   > ⚠️ **Importante:** Cambia `mi_clave_super_secreta_12345` por una clave única y segura

5. Inicia el servidor:
```bash
   npm run dev
```
   
   Verás un mensaje similar a: `Backend escuchando en puerto 4000` ✅

### Paso 3: Configurar el cliente (Frontend)

1. Abre una **nueva terminal** (mantén la anterior abierta con el servidor)
2. Desde la carpeta raíz del proyecto, navega a la carpeta del cliente:
```bash
   cd cliente
```

3. Instala las dependencias:
```bash
   npm install
```

4. Inicia la aplicación:
```bash
   npm run dev
```

   Verás un mensaje similar a:
```
   VITE v5.4.0  ready in 500 ms
   ➜  Local:   http://localhost:5173/
```

### Paso 4: Acceder a la aplicación

1. Abre tu navegador web (Chrome, Firefox, Edge, etc.)
2. Ve a la dirección: **http://localhost:5173**
3. ¡Listo! Ya puedes usar StudyHub 🎉

---

## 👤 Crear tu primera cuenta

### Registrar el primer usuario (Administrador)

El **primer usuario que se registre** automáticamente será administrador:

1. En la página principal, haz clic en **"Iniciar Sesión"**
2. Como no hay formulario de registro visible, necesitas registrarte usando una herramienta como:
   - **Postman** (recomendado para principiantes)
   - **Thunder Client** (extensión de VS Code)
   - O usando el siguiente comando en terminal:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@studyhub.com","password":"admin123"}'
```

3. Luego, inicia sesión con:
   - **Email:** admin@studyhub.com
   - **Contraseña:** admin123

> 💡 **Tip:** El primer usuario tendrá acceso al panel de administración donde podrá subir resúmenes

---

## 📖 Cómo usar StudyHub

### Para Estudiantes:

1. **Iniciar sesión** con tu cuenta
2. Ve a la sección **"Resúmenes"** en el menú superior
3. Usa los **filtros** para buscar por curso
4. Haz clic en **"Ver Resumen"** para abrir el PDF
5. Puedes descargar los PDFs haciendo clic derecho y "Guardar como"

### Para Administradores:

1. Inicia sesión con tu cuenta de administrador
2. Ve a la sección **"Admin"** en el menú superior
3. Para subir un resumen:
   - Completa el formulario con: Título, Curso, Unidad
   - Selecciona un archivo PDF
   - Haz clic en **"Subir Resumen"**
4. Para eliminar un resumen:
   - Busca el resumen en la lista
   - Haz clic en el botón **"Eliminar"**

---

## 🔒 Seguridad

- Cambia el `JWT_SECRET` en producción
- No compartas tu archivo `.env`
- Usa contraseñas seguras
- El primer usuario registrado es administrador automáticamente

---

## 🎓 Tecnologías Utilizadas

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express
- **Autenticación:** JWT (JSON Web Tokens)
- **Almacenamiento:** Multer (archivos)

---

¡Disfruta usando StudyHub! 📚✨
