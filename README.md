# Stack MEVN with authentication - Backend

This backend use authentication with access tokens using JWT. Besides, use Refresh Tokens for refresh the access tokens. All tokens are stored via httpOnly cookies.

## Installation
This project use npm for packet management. For install al dependencies run in a terminal
```bash
npm install
```

## Initial configuration
Copy `.env.example` to `.env` and modify the variables.
```bash
MONGO_URI= # URI for mongo connect. Ex. mongodb://localhost:27017/database
JWT_SECRET= # String used for sign JWT tokens. This must be a strong string
COOKIE_SECRET= # String used for sign cookies. This must be a strong string
PORT= # Port number to listen on. Ex. 3000
```

## Start project

For start the project in developer mode you can run in a terminal
```bash
npm run dev
```
For production mode run
```bash
npm start
```

# License
This project use [Apache License V2](./license)