import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './config/db.js';
import mainRouter from './routes/index.js';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main API Router
app.use('/api', mainRouter);

// IMPORTANT: Export the app for Vercel
export default app;

/*
// REMOVE OR COMMENT OUT THIS PART:
app.listen(config.port, () => {
  console.log(`Backend server running on http://localhost:${config.port}`);
});
*/