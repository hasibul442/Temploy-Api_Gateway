# Temploy API Gateway

Lightweight API gateway for the Temploy platform. Centralized routing, simple REST endpoints for category management, and MongoDB persistence.

## Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Environment](#environment)
- [Project structure & key symbols](#project-structure--key-symbols)
- [Database](#database)
- [Error handling](#error-handling)

## Overview

This repository exposes simple category management endpoints mounted at `/api/v1`. The entrypoint is [app.js](app.js).

## Requirements

- Node.js (v18+ recommended)
- npm
- A MongoDB URI (see [.env.example](.env.example))

Install dependencies:

```sh
npm install
```

Run:

```sh
# start
npm start

# development (nodemon)
npm run dev
```

The server reads the port from `APPLICATION_PORT` in the environment and connects to MongoDB using `MONGO_DB_URL` from the environment.

## Environment

Copy `.env.example` to `.env` and update:
See: [.env.example](.env.example)

URL: `https://api-gateway-t57d.onrender.com/`


## Project structure & key symbols

 ```
 |-- src
 |   |-- config
 |   |-- controllers
 |   |   |-- CategoryController.js
 |   |   |-- HealthController.js
 |   |-- middlewares
 |   |   |-- errorHandler.js
 |   |-- models
 |   |   |-- Categories.js
 |   |-- routes
 |   |   |-- routes.js
 |   |-- services
 |   |   |-- CategoryService.js
 |   |-- utils
 |   |   |-- dbconnection.js
 |-- .env.example
 |-- app.js
 |-- package.json
 ```

## Database
MongoDB is used for data persistence. The connection is established in [`dbconnection.js`](src/utils/dbconnection.js).

## Error handling

Uncaught errors are formatted by the middleware [`errorHandler`](src/middlewares/errorHandler.js).
