# TaskFlow - Full-Stack Task Management System

TaskFlow is a beautifully designed, responsive, full-stack task management application. It demonstrates the ability to develop a modern UI, design and consume REST APIs, and structure a backend application using Node.js and Express.js with in-memory storage (no database).

## ✨ Features

### Frontend (React.js + Vite + Tailwind CSS)
*   **Dual Views:** View tasks in a traditional List View or an interactive Kanban Board.
*   **Dark Mode:** Built-in dark mode with seamless toggling.
*   **Advanced Filtering & Sorting:** Search by title/description (debounced), filter by status/priority, and sort by date/priority.
*   **Pagination:** Easy navigation through large lists of tasks.
*   **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
*   **State Management:** Proper handling of loading, success, empty, and error states using custom hooks.
*   **Beautiful UI:** Smooth animations, toast notifications, and skeleton loaders.

### Backend (Node.js + Express.js)
*   **RESTful API:** Complete CRUD endpoints for task management.
*   **Clean Architecture:** Strict separation of routes, controllers, services, and data storage.
*   **In-Memory Storage:** Uses native JavaScript structures for data persistence (resets on server restart).
*   **Validation:** Robust request payload validation before processing.
*   **Error Handling:** Centralized error handling and customized responses.
*   **API Documentation:** Built-in Swagger/OpenAPI documentation.

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your machine.

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   * Copy `.env.example` to `.env`
   * By default, it will run on `PORT=5000`
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will start at `http://localhost:5000`*

### 2. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`*

## 📚 API Documentation

Once the backend is running, you can access the interactive Swagger API documentation at:
**`http://localhost:5000/api-docs`**

### Endpoints Overview

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get all tasks (supports pagination, search, sorting) |
| `GET` | `/api/tasks/stats` | Get statistics about current tasks |
| `GET` | `/api/tasks/:id` | Get a single task by its ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Task Data Structure

```json
{
  "id": "uuid-string",
  "title": "Complete assignment",
  "description": "Build the full-stack task manager",
  "status": "pending", // pending | in_progress | completed
  "priority": "high", // low | medium | high
  "dueDate": "2026-10-05T00:00:00.000Z",
  "createdAt": "2026-10-01T12:00:00.000Z",
  "updatedAt": "2026-10-01T12:00:00.000Z"
}
```

## 🏗️ Project Architecture

```text
/
├── backend/                  # Node.js + Express Backend
│   ├── src/
│   │   ├── config/           # Environment and App config
│   │   ├── controllers/      # Request handlers
│   │   ├── data/             # In-memory storage and seed data
│   │   ├── middleware/       # Error handling, logging, etc.
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # Business logic layer
│   │   ├── validators/       # Input validation logic
│   │   ├── app.js            # Express app configuration
│   │   ├── server.js         # Entry point
│   │   └── swagger.js        # API docs configuration
│   └── package.json
│
└── frontend/                 # React.js + Vite Frontend
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context (Theme)
    │   ├── hooks/            # Custom React hooks (useTasks, useDebounce)
    │   ├── pages/            # Page-level components
    │   ├── services/         # API integration layer (Axios)
    │   ├── utils/            # Helper functions and constants
    │   ├── App.jsx           # Main routing component
    │   └── main.jsx          # Entry point
    ├── index.html
    ├── tailwind.config.js    # Tailwind styling config
    └── package.json
```

## 💡 Note on Data Persistence
As per requirements, this application does **not** use a database. All tasks are stored in backend memory using native JavaScript constructs. Therefore, restarting the backend server will reset the data to the initial seeded tasks.

