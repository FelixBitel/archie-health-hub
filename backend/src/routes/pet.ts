import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get user's pet
router.get('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const result = await (req as any).db.query(
      'SELECT * FROM pets WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});

// Create pet
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { name, species, breed, age, weight } = req.body;
    
    const result = await (req as any).db.query(
      'INSERT INTO pets (user_id, name, species, breed, age, weight) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, name, species, breed, age, weight]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pet' });
  }
});

// Update pet
router.put('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { name, species, breed, age, weight } = req.body;
    
    const result = await (req as any).db.query(
      'UPDATE pets SET name = $1, species = $2, breed = $3, age = $4, weight = $5 WHERE user_id = $6 RETURNING *',
      [name, species, breed, age, weight, userId]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
});

export default router;
