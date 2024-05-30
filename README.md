# REST API Backend with Express.js, PostgreSQL and Frontend with React.js

## Summary

This web application is a full-stack solution that combines a React-based frontend with a Node.js backend.

## Technology Used

### Frontend (React)

- **React:** A JavaScript library for building user interfaces, providing a component-based architecture that simplifies the development of interactive and dynamic UIs.
  
  - Version: **v 18.2.0**
  - Node Version: **v 20.10.0**

- **Redux:** A state management library that helps manage the global state of the application, making it easier to handle data flow and state changes.

### Backend (Node)

- **Node.js:** This is a simple REST API built using Express.js and PostgreSQL for managing users. The API supports creating, retrieving, updating, and deleting user information.
  
    Version: **node version v20.10.0**


## Project Initialization

Follow these steps to initialize the Jobs project:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd user-management
   ```

2. **Create a .env File:**
   Create a .env file in the project root and configure the necessary environment variables.


## Installing Packages

### Frontend
For installing the frontend packages
   ```bash
   cd frontend
   npm i
   ```

### Configure the Frontend Env

Create a PostgreSQL database and a user with the necessary permissions. Update the database configuration in your application.

Example configuration in `.env.development` file:

```
REACT_APP_API_URL = http://localhost:3002
```


### Backend
For installing the backend packages
   ```bash
   cd backend
   npm i
   ```

### Configure the Backend Env

Create a PostgreSQL database and a user with the necessary permissions. Update the database configuration in your application.

Example configuration in `.env` file:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_NAME=your_database_name
POSTGRES_USER=your_database_user
POSTGRES_PASSWORD=your_database_password
PORT = 3002
SALT_ROUNDS = 10

```

## Running the Server

### Frontend

1. **Start the React Development Server:**
   ```bash
   cd frontend
   npm start
   ```

   This command initiates the development server, making the frontend accessible at `http://localhost:3000`.

### Backend

1. **Run the Node.js Backend Server:**
   ```bash
   cd backend
   npm start
   ```

   The Node.js server starts and listens on port 3002 by default. The API and backend functionalities are now accessible at `http://localhost:3002`.