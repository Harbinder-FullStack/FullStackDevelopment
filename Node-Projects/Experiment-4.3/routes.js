// routes/seatRoutes.js
import { Router } from 'express';
import { getSeats, reserveSeat, bookSeat, releaseSeat } from './controller.js';

const router = Router();

// GET /api/seats or /api/seats/:status?
router.get('/seats/:status', getSeats);

// POST endpoints
router.post('/seats/reserve', reserveSeat);
router.post('/seats/book', bookSeat);
router.post('/seats/release', releaseSeat); 

export default router;
