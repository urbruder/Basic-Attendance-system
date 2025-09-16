// backend/config/config.js
import dotenv from 'dotenv';
dotenv.config();

// Use 'export default'
export default {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
};