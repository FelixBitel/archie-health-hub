import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get health records
router.get('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const result = await req.db.query(
      `SELECT hr.* FROM health_records hr 
       JOIN pets p ON hr.pet_id = p.id 
       WHERE p.user_id = $1 
       ORDER BY hr.record_date DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
});

// Create health record
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { pet_id, record_date, temperature, weight, notes } = req.body;
    
    // Verify pet belongs to user
    const petCheck = await req.db.query(
      'SELECT id FROM pets WHERE id = $1 AND user_id = $2',
      [pet_id, userId]
    );
    
    if (petCheck.rows.length === 0) {
      res.status(403).json({ error: 'Pet not found or access denied' });
      return;
    }
    
    const result = await req.db.query(
      'INSERT INTO health_records (pet_id, record_date, temperature, weight, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [pet_id, record_date, temperature, weight, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create health record' });
  }
});

export default router;
