// backend/routes/authRoutes.js
import express from 'express';
import { login } from '../controllers/authController.js'; // Named import with .js extension

const router = express.Router();

router.post('/login', login);

// Use 'export default'
export default router;