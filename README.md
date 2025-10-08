
# 🏠 Real Estate App

Aplicación **Full Stack** para la gestión y visualización de propiedades inmobiliarias.  
Incluye un **backend en .NET 8 + MongoDB** y un **frontend en Next.js + Tailwind + ShadCN UI**.  
Permite listar propiedades, aplicar filtros por nombre, dirección y rango de precios, y visualizar detalles individuales.

---

## 🚀 Tecnologías utilizadas

| Capa | Tecnología | Descripción |
|------|-------------|-------------|
| ⚙️ Backend | .NET 8 (C#), ASP.NET Core Web API | API RESTful |
| 🗄️ Base de datos | MongoDB Atlas | Persistencia de propiedades |
| 💻 Frontend | Next.js (React 19), TailwindCSS, ShadCN UI | UI moderna y responsive |
| 🧪 Testing | Jest + RTL (Frontend) | Pruebas unitarias |
| 🔧 Control de versiones | GitHub | Monorepo con frontend y backend |

## Installation

### Clonar el repositorio

```bash
git clone https://github.com/migueonate/real-estate-app.git
cd real-estate-app
```

#### 📦 Instalar dependencias Backend
```bash
cd backend
dotnet restore
dotnet run

La API quedará disponible en
👉 http://localhost:5292/api/properties

🧭 Swagger
Disponible en:
👉 http://localhost:5292/swagger/index.html
```


#### 📦 Instalar dependencias Frontend
```bash
cd ../frontend
npm install
npm run dev

Abre 👉 http://localhost:3000
```
## Features

- Listado de propiedades con nombre, dirección, precio e imagen
- Filtros dinámicos por nombre, dirección y rango de precios 
- Modal de vista rápida (Quick View)
- UI responsive con ShadCN + Tailwind
- Integración completa con API REST .NET 
- Manejo de errores y estados de carga
- Tests unitarios para frontend
## Running Tests

To run tests, run the following command

```bash
  cd frontend
  npm run test
```


## Authors

- [@migueonate](https://github.com/migueonate)


## Feedback

Este proyecto fue desarrollado como parte de una prueba técnica para evaluar habilidades en React y buenas prácticas de arquitectura, testing y documentación.

