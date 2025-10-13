import express, { json } from 'express';
import cors from 'cors';

import { config } from 'dotenv';
config(); // This loads variables from .env into process.env.


import connectDB from './config/db';
import studentRoutes from './routes/studentRoutes';

const app = express();
const PORT = process.env.PORT || 5000;


// Connect to MongoDB
connectDB();

// Middlewares
app.use(json());
app.use(cors({
  origin: 'http://localhost:3000',  // React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Routes
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => console.log(`(Node + Express) Server running at http://localhost:${PORT}`));
