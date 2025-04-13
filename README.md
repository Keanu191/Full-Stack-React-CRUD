# Full-Stack React CRUD Application

Welcome to the **Full-Stack React CRUD Application** repository! This project is a comprehensive example of a full-stack application that utilizes React for the frontend, a C# backend, and MongoDB for the database. The application demonstrates CRUD (Create, Read, Update, Delete) operations seamlessly integrated across the stack.

---

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [License](#license)

---

## Overview

This project is designed to showcase a complete full-stack application with a modular architecture. It aims to demonstrate how the following technologies can work together:
- **Frontend**: React (with TypeScript)
- **Backend**: C# (ASP.NET Core)
- **Database**: MongoDB

The application includes user-friendly interfaces, API integrations, and backend logic to provide a seamless experience.

---

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - TailwindCSS 
  
- **Backend**:
  - ASP.NET Core (C#)
  - Swagger UI for API documentation
  
- **Database**:
  - MongoDB

---

## Features

1. **CRUD Operations**:
   - Create, read, update, and delete records seamlessly across the stack.

2. **Frontend**:
   - Responsive React UI with TypeScript.
   - Real-time updates and clean design.

3. **Backend**:
   - RESTful API built with ASP.NET Core.
   - Integrated Swagger UI for API testing and documentation.

4. **Database**:
   - MongoDB for efficient and scalable data storage.

5. **Integration**:
   - End-to-end integration of frontend, backend, and database.

---

## Setup Instructions

### Prerequisites
- Install [Node.js](https://nodejs.org/) (for the frontend).
- Install [.NET SDK](https://dotnet.microsoft.com/) (for the backend).
- Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) or have access to a running MongoDB instance.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd React-App
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory
   ```bash
   cd WebAPI
   ```
2. Restore NuGet packages
   ```bash
   dotnet restore
   ```
3. Run the application
   ```bash
   dotnet run
   ```

### MongoDB Setup
- Ensure MongoDB is running locally or on a remote server.
- Update the connection string in the backend configuration file to match your MongoDB instance.

## Screenshots

### Frontend + Backend (Overview)
![Frontend + Backend](https://i.imgur.com/MjPJnM5.png)

### Backend
![Backend](https://i.imgur.com/fUkSBKE.png)

### Backend + MongoDB Compass
![Backend + Compass](https://i.imgur.com/5Ech75j.png)

### API + Frontend
![API + Frontend](https://i.imgur.com/J9sIFoc.png)

### Additional Views

**Register Page**  
![Register](https://i.imgur.com/tfmON3y.png)

**Login Page**  
![Login](https://i.imgur.com/84Kmhcv.png)

**Categories Page**  
![Categories](https://i.imgur.com/Fy8gSOw.png)

## API Documentation
This backend includes a fully documented API using swagger UI. Once the backend is running, you can access the API documentation at:
```bash
http://localhost:<backend-port>/swagger
```

## License
This project is licensed under the MIT License.
