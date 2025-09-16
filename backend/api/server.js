import express from 'express';
import serverless from 'serverless-http'; // ← import serverless-http
import cors from 'cors';
import connectDB from '../config/db.js';
import mainRouter from '../routes/index.js';

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', mainRouter);

// ---------------------------
// Remove app.listen()
// ---------------------------
// app.listen(config.port, () => {
//   console.log(`Backend server running on http://localhost:${config.port}`);
// });

// Export serverless handler
export const handler = serverless(app);