# Developer Productivity Dashboard - Backend

Backend API for the Developer Productivity Dashboard built using Node.js, Express.js and MongoDB.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Features

- User Signup and Login
- User Profile Management
- Project Creation and Retrieval
- Task Create, Update and Delete
- Task Status Management
- Input Validation
- JWT Authentication
- Centralized Error Handling

## Run Project

Install dependencies:

```bash
npm install
```

Start backend:

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

## Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get profile |
| PUT | /api/auth/profile | Update profile |
| POST | /api/projects | Create project |
| GET | /api/projects | Get projects |
| POST | /api/tasks | Create task |
| GET | /api/tasks | Get tasks |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

## Security

Passwords are hashed using bcryptjs and protected routes use JWT authentication.