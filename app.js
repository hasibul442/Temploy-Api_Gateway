// index.js
import express from 'express';
import dotenv from "dotenv";
import connectDB from './src/utils/dbconnection.js';
import routes from './src/routes/routes.js';

dotenv.config();
const app = express();
const port = 3000;


// Middleware
app.use(express.json());
connectDB();

// Routes
app.use('/v1/api', routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});