// backend/index.js

// Use 'import' instead of 'require'
import express from 'express';
import cors from 'cors';
import config from './config/config.js';         // Note the '.js' extension
import connectDB from './config/db.js';           // Note the '.js' extension
import mainRouter from './routes/index.js';       // Note the '.js' extension

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main API Router
app.use('/api', mainRouter);

// Start the server
app.listen(config.port, () => {
  console.log(`Backend server running on http://localhost:${config.port}`);
});