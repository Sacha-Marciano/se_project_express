# WTWR (What to Wear?): Backend API

This repository contains the backend server for the WTWR (What to Wear?) application. The backend is responsible for handling user authentication, clothing item management, and secure data storage using MongoDB. It is built with Node.js, Express, and Mongoose, and follows best practices for validation, error handling, and logging.

- **Live site:** https://watowear.jumpingcrab.com
- **Frontend repo:** https://github.com/Sacha-Marciano/se_project_react

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Clothing Items](#clothing-items)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Development Scripts](#development-scripts)
- [Contributing](#contributing)

---

## Features
- User registration and login with JWT authentication
- Secure password hashing (bcrypt)
- CRUD operations for clothing items
- Like/dislike functionality for items
- Input validation using Celebrate/Joi
- Centralized error handling and logging (Winston)
- MongoDB data storage via Mongoose

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Celebrate/Joi (validation)
- Winston & express-winston (logging)
- dotenv (environment variables)

---

## API Endpoints

### Authentication
| Method | Endpoint     | Description                | Auth Required |
|--------|-------------|----------------------------|:-------------:|
| POST   | /signup     | Register a new user        |      No       |
| POST   | /signin     | Login and get JWT token    |      No       |

### Users
| Method | Endpoint     | Description                        | Auth Required |
|--------|-------------|------------------------------------|:-------------:|
| GET    | /users/me   | Get current user profile           |     Yes       |
| PATCH  | /users/me   | Update current user profile        |     Yes       |

### Clothing Items
| Method | Endpoint             | Description                                 | Auth Required |
|--------|---------------------|---------------------------------------------|:-------------:|
| GET    | /items              | Get all clothing items                      |      No       |
| POST   | /items              | Create a new clothing item                  |     Yes       |
| DELETE | /items/:itemId      | Delete a clothing item (owner only)         |     Yes       |
| PUT    | /items/:itemId/likes    | Like a clothing item                      |     Yes       |
| DELETE | /items/:itemId/likes    | Remove like from a clothing item           |     Yes       |

> **Note:** All authenticated routes require an `Authorization: Bearer <token>` header.

---

## Validation
All incoming data is validated using [Celebrate](https://github.com/arb/celebrate) and Joi schemas:
- **User registration & update:**
  - `name`: string, 2-30 chars, required
  - `avatar`: valid URL, required
  - `email`: valid email, required
  - `password`: string, required
- **Login:**
  - `email`: valid email, required
  - `password`: string, required
- **Clothing item creation:**
  - `name`: string, 2-30 chars, required
  - `imageUrl`: valid URL, required
  - `weather`: one of `hot`, `warm`, `cold`, required
- **IDs:**
  - `itemId`: 24-character hex string (MongoDB ObjectId)

---

## Error Handling
- Centralized error handler returns JSON with a `message` and appropriate HTTP status code.
- Custom error classes for 400, 401, 403, 404, and 409 errors.
- Celebrate validation errors are handled and returned as 400 Bad Request.
- All unknown routes return a 404 Not Found error.

---

## Logging
- All requests are logged to `request.log` (and console in development) using Winston.
- All errors are logged to `error.log`.

---

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd se_project_express(mine)
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your variables (see below).
4. **Start MongoDB:**
   - Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017/wtwr_db` or update the connection string in `app.js`.
5. **Run the server:**
   ```bash
   npm run start
   # or for development with hot reload:
   npm run dev
   ```

---

## Environment Variables
Create a `.env` file in the root directory with the following (example):
```
PORT=3001
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## Development Scripts
- `npm run start` — Start the server
- `npm run dev` — Start the server with hot reload (nodemon)
- `npm run lint` — Run ESLint

---

## Contributing
Pull requests and issues are welcome! Please:
- Follow the existing code style (see ESLint/Prettier configs)
- Write clear commit messages
- Add tests for new features if possible

---

## License
ISC

---

## Author
[Sacha_M_Marciano](https://github.com/Sacha-Marciano)
