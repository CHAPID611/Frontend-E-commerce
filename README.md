# Frontend E-Commerce

Frontend de la aplicación E-Commerce desarrollado con React, Chakra UI y Apollo Client.

## 🚀 Tecnologías Principales

- React 19
- Chakra UI v3
- Apollo Client
- TypeScript
- Tailwind CSS
- React Router v7
- Next Themes

## 📦 Dependencias Principales

```json
{
  "@apollo/client": "^3.13.8",
  "@chakra-ui/react": "^3.19.1",
  "@chakra-ui/system": "^2.6.2",
  "@chakra-ui/form-control": "^2.2.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router": "^7.5.3",
  "next-themes": "^0.4.6",
  "graphql": "^16.11.0",
  "react-hook-form": "^7.56.4",
  "react-icons": "^5.5.0"
}
```

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Configuración

El proyecto está configurado para conectarse a un servidor GraphQL en:
```
http://localhost:4000/graphql
```

## 🌓 Características

- Modo claro/oscuro con next-themes
- Formularios de autenticación con react-hook-form
- Diseño responsive con Chakra UI
- Integración con GraphQL usando Apollo Client
- UI moderna con Chakra UI y React Icons
- Enrutamiento con React Router v7

## 📝 Notas

- Asegúrate de tener Node.js instalado (versión 18 o superior)
- El backend debe estar corriendo en el puerto 4000
- Las variables de entorno se configuran en el archivo `.env`

# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
