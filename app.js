// index.js
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './src/utils/dbconnection.js';
import routes from './src/routes/routes.js';
import { errorHandler, notFound } from './src/middlewares/errorHandler.js';

dotenv.config();
const app = express();
const port = process.env.APPLICATION_PORT;


// Middleware
app.use(express.json());
connectDB();

app.use(cors());


// Routes
app.use('/api/v1', routes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});