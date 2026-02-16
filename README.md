# Prueba Técnica Sistema de Asignación de Turnos

Aplicación Angular 21

Implementa un sistema de login, listado de empleados y asignación de turnos con protección de rutas.

Enlace de deploy realizado con firebase: appturnos-12d40.web.app

##  Características

-  **Autenticación** - Login con validación de credenciales
-  **Listado de Empleados** - Consumo de API REST (JSONPlaceholder)
-  **Asignación de Turnos** - Formulario reactivo con validaciones complejas
-  **Protección de Rutas** - Functional AuthGuard
-  **Gestión de Estado** - Datos persisten en localStorage
-  **Diseño Responsive** - UI moderna con gradientes
-  **GitHub Pages Ready** - Deploy automático configurado
-  **Manejo Robusto de Errores** - Validaciones y mensajes útiles

##  Quick Start

### Desarrollo Local
\\\bash
npm install
npm start
\\\
Abre http://localhost:4200

### Credenciales de Prueba
\\\
Email: admin@test.com
Password: 123456
\\\



##  Estructura del Proyecto

\\\
src/app/
 core/                   # Servicios y guards
    guards/auth.guard.ts
    services/
        auth.service.ts
        employee.service.ts
        shift.service.ts
 features/               # Componentes por funcionalidad
    auth/login/
    employees/
        employees-list/
        shift-assignment/
 shared/models/          # Interfaces TypeScript
 app.routes.ts          # Rutas
\\\

##  Rutas de la Aplicación

| Ruta | Autenticación | Descripción |
|------|--------------|------------|
| \/login\ |  Pública | Formulario de login |
| \/empleados\ |  Protegida | Listado de empleados |
| \/asignar-turno/:id\ |  Protegida | Asignar turno a empleado |

##  Descripción Técnica

### Servicios

**AuthService**: Maneja login/logout con localStorage (SSR compatible)
**EmployeeService**: Consumo de https://jsonplaceholder.typicode.com/users
**ShiftService**: Persistencia de turnos en localStorage

### Componentes Standalone
Todos los componentes usan Angular 21 standalone (sin NgModule)

### Formularios Reactivos
- Login: email (required + format) + password (required + min 6)
- Shifts: date + startTime + endTime con validador personalizado

### Estilos
- CSS custom (sin Bootstrap/Material)
- Responsive design con media queries
- Gradientes modernos y animaciones suaves
- WCAG AA compliant

##  Comandos Disponibles

\\\bash
npm start                  # Desarrollo local (puerto 4200)
npm run build             # Build producción (SPA)
npm run build:gh-pages    # Build para repo secundario en GitHub Pages
npm run build:gh-pages:main  # Build para página principal de usuario
npm test                  # Ejecutar tests
\\\

##  Deployment en Firebase Hosting

### Configuración Inicial

1. **Instalar Firebase CLI**
   \\\bash
   npm install -g firebase-tools
   \\\

2. **Autenticarse con Firebase**
   \\\bash
   firebase login
   \\\
   Se abrirá el navegador para autorizar con tu cuenta Google.

3. **Inicializar Firebase en el proyecto**
   \\\bash
   firebase init hosting
   \\\
   Responde las preguntas:
   - **Which Firebase project?** → Selecciona tu proyecto
   - **What do you want to use as your public directory?** → `dist/pruebatec/browser`
   - **Configure as a single-page app?** → **Sí** (Importante para Angular SPA)

### Deployment Manual

1. **Build de producción**
   \\\bash
   npm run build
   \\\
   Genera los archivos optimizados en `dist/pruebatec/browser/`

2. **Deploy a Firebase**
   \\\bash
   firebase deploy
   \\\
   Tu aplicación estará disponible en: `https://tu-proyecto.web.app`

### Deployment Automático con GitHub

Para automatizar el deployment cada vez que haces push a GitHub:

1. En **Firebase Console** → **Hosting** → **Conectar repositorio**
2. Autoriza GitHub y selecciona tu repositorio
3. Firebase genera automáticamente `.github/workflows/firebase-hosting-pull-request.yml`
4. A partir de ahora, cada `git push` dispara un deployment automático

### Configuración SPA en Firebase

El archivo `firebase.json` está configurado correctamente para SPA:

\\\json
{
  "hosting": {
    "public": "dist/pruebatec/browser",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
\\\

Esta configuración **redirige todas las rutas a `index.html`**, permitiendo que Angular Router manaje las rutas en el cliente (Essential para SPA).

### Flujo Recomendado de Desarrollo

1. Hace cambios en el código
2. Prueba localmente: `npm start`
3. Build: `npm run build`
4. Deploy: `firebase deploy`

O mejor aún, usa GitHub CI/CD:

1. Hace cambios en el código
2. `git push` a GitHub
3. Firebase automáticamente hace build y deploy

##  Decisiones Técnicas

- **Standalone Components**: Angular 21 moderno, sin NgModules
- **Signals para estado**: Reactividad nativa
- **RxJS Observables**: Manejo de datos async
- **localStorage**: Persistencia cliente
- **Functional Guards**: Patrón moderno de AuthGuard
- **Control flow nativo**: @if, @for en lugar de ngIf, ngFor
- **SSR Compatible**: Aunque es SPA, respeta isPlatformBrowser

##  Archivos Principales

- [angular.json](angular.json) - Configuración de build (mode: static/SPA)
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) - GitHub Actions CI/CD
- [src/app/app.routes.ts](src/app/app.routes.ts) - Definición de rutas
- [public/.nojekyll](public/.nojekyll) - Necesario para GitHub Pages


 Funcionalidad completa de requisitos  

##  Performance

- Bundle Size: ~82kb gzipped
- SPA puro: Carga rápida después del primer load
- Optimizado para GitHub Pages

##  APIs Utilizadas

**JSONPlaceholder (pública, free, dada en el documento de prueba tecnica)**
- GET /users  10 usuarios de prueba

##  Notas

- Autenticación es simulada (not para producción)
- Turnos se guardan en localStorage (pierden en clear)
- Compatible con SSR aunque está configurada como SPA
- No usa jQuery ni librerías pesadas

---

**Versión**: 1.0.0
**Angular**: 21.1.0
**Node**: 24.13.1
**Build**: SPA Estática para Firebase
