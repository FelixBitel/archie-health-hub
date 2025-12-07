import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import petRoutes from './routes/pet';
import healthRoutes from './routes/health';
import tasksRoutes from './routes/tasks';
import aiRoutes from './routes/ai';
import pool from './database/connection';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'Backend is running' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
