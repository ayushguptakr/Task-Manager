# FlowPilot

FlowPilot is a full-stack task manager with JWT authentication, MongoDB persistence, task CRUD, and AI-powered productivity insights. Users can sign up, log in, manage tasks, request priority/category suggestions, and generate a motivating daily summary.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT with 7-day expiry, bcrypt password hashing
- AI: OpenAI-compatible chat completions API

## Project Structure

```text
backend/
  controllers/
  middleware/
  models/
  routes/
  server.js
frontend/
  src/
    api/
    components/
    context/
    pages/
    utils/
```

## Environment Variables

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_ai_api_key
AI_API_BASE_URL=your_ai_api_base_url
AI_MODEL=your_model_name
PORT=5000
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env` when deploying or changing the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

The API runs on `http://localhost:5000` and the app runs on `http://localhost:5173`.

## API Overview

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Tasks:

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

AI:

- `POST /api/ai/suggest`
- `POST /api/ai/summary`

All task and AI routes require `Authorization: Bearer <token>`.

## Testing With Postman or Thunder Client

1. Start the backend with a valid MongoDB connection string and AI API configuration.
2. Register with `POST http://localhost:5000/api/auth/register`.
3. Copy the returned token.
4. Add `Authorization: Bearer <token>` to task and AI requests.
5. Create tasks, update statuses, and call `/api/ai/summary`.

## Deployment

### Backend on Render

1. Create a new Render Web Service from this repository.
2. Set the root directory to `backend`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add environment variables from `backend/.env.example`.
6. Set `CLIENT_URL` to the deployed Vercel frontend URL.

### Frontend on Vercel

1. Create a new Vercel project from this repository.
2. Set the root directory to `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_API_URL=https://your-render-api.onrender.com/api`.

After both deployments are live, update Render `CLIENT_URL` to the exact Vercel URL so CORS allows browser requests.
