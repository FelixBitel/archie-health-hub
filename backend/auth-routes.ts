import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';

const router = Router();

// Initialize pool - will be passed from server
let pool: Pool;

export const initAuthRoutes = (dbPool: Pool) => {
  pool = dbPool;
  return router;
};

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['email', 'password', 'name']
    });
  }

  try {
    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: 'User already exists',
        email: email
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashedPassword, name]
    );

    const user = result.rows[0];
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: error.message
    });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    });
  }

  try {
    // Find user
    const result = await pool.query(
      'SELECT id, email, name, password FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const user = result.rows[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: error.message
    });
  }
});

// Get current user
router.get('/me', async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to fetch user',
      message: error.message
    });
  }
});

export default router;
