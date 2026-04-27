# TaskFlow – Premium MERN Stack Task Manager

## Tech Stack
- Frontend: React (Vite), TailwindCSS, React Router, Axios, React Hook Form, Framer Motion, Lucide, Recharts, React Hot Toast, Context API
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, multer, dotenv, cookie-parser, cors

## Quick Start
### Server
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Client
```bash
cd client
npm install
npm run dev
```

## Core Features
- JWT auth (register/login/logout/me)
- Role-based access (admin/user)
- Task CRUD with checklist-based status automation and progress calculation
- Analytics dashboard with charts
- Team members view and task stats
- Report export (CSV)
- Dark/light mode toggle
- Responsive premium SaaS-inspired UI

## API Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/reports/export`
