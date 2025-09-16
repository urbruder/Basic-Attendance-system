// backend/routes/attendanceRoutes.js
import express from 'express';
// Import all controller functions as a module
import * as attendanceController from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/start', attendanceController.startSession);
router.post('/mark', attendanceController.markAttendance);
router.get('/status/:sessionId', attendanceController.getStatus);

// Use 'export default'
export default router;