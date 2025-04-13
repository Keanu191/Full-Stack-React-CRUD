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
  - TailwindCSS (or add your preferred CSS framework here)
  
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
![Frontend+BackendOverView](https://github.com/user-attachments/assets/6eb7171b-18eb-4211-8356-a7b4b0349dbd)


### Backend
![BackendOnly](https://github.com/user-attachments/assets/79dc4c24-f328-4052-8f55-f74be51d7003)


### Backend + MongoDB Compass
![Backend+Compass](https://github.com/user-attachments/assets/3db46a4f-d012-4138-872f-0238155f0a23)


### API + Frontend

![API+Frontend](https://github.com/user-attachments/assets/ed7bcfe8-b286-4c28-8d15-67b50c1f0a90)

### Additional Views
![Register](https://github.com/user-attachments/assets/80101492-3bd8-40c2-9db9-45f8a0c47e84)
![Login](https://github.com/user-attachments/assets/cc41bddb-d930-436b-82ec-6733eee350a4)
![Categories](https://github.com/user-attachments/assets/9fd6b85b-d323-41e8-abfb-6a6a470c7631)

## API Documentation
This backend includes a fully documented API using swagger UI. Once the backend is running, you can access the API documentation at:
```bash
http://localhost:<backend-port>/swagger
```

## License
This project is licensed under the MIT License.
