// controllers/seatController.js
import SeatManager from './model/seat.manager.js';
import STATUS  from './constant.js';

// initialize with desired seat count per row
const seatManager = new SeatManager(10); 

// auto-cleanup expired reservations every 5s
setInterval(() => seatManager.cleanupExpiredReservations(), 5000);

export function getSeats(req, res) {
  const { status } = req.params;
  const validStatuses = [STATUS.STATUS_AVAILABLE, STATUS.STATUS_RESERVED, STATUS.STATUS_BOOKED];

  let seats = seatManager.getAllSeats();

  if (status && status.toLowerCase() !== 'all') {
    const s = status.toLowerCase();
    if (!validStatuses.includes(s)) {
      return res.status(400).json({ message: 'Invalid status filter' });
    }
    seats = seats.filter(seat => seat.status === s);
  }

  res.json(seats);
}

export function reserveSeat(req, res) {
  const { seatNumber, userId, durationMs } = req.body;
  if (seatNumber == null || !userId) {
    return res.status(400).json({ message: 'seatNumber and userId are required' });
  }

  const seat = seatManager.getSeat(seatNumber);
  if (!seat) return res.status(404).json({ message: 'Seat not found' });

  // reserve with default 1 min if durationMs not provided or invalid
  const ttl = typeof durationMs === 'number' && durationMs > 0 ? durationMs : 60 * 1000;

  const result = seat.reserve(userId, ttl);

  if (!result.success) return res.status(409).json(result);
  res.json(result);
}

export function bookSeat(req, res) {
  const { seatNumber, userId } = req.body;
  if (seatNumber == null || !userId) {
    return res.status(400).json({ message: 'seatNumber and userId are required' });
  }

  const seat = seatManager.getSeat(seatNumber);
  if (!seat) return res.status(404).json({ message: 'Seat not found' });

  // If reservation expired, release and return conflict
  if (seat.isReservationExpired()) {
    seat.release();
    return res.status(409).json({ success: false, message: 'Reservation expired' });
  }

  const result = seat.book(userId);
  if (!result.success) return res.status(409).json(result);
  res.json(result);
}

export function releaseSeat(req, res) {
  const { seatNumber, userId } = req.body;
  if (seatNumber == null || !userId) {
    return res.status(400).json({ message: 'seatNumber and userId are required' });
  }

  const seat = seatManager.getSeat(seatNumber);
  if (!seat) return res.status(404).json({ message: 'Seat not found' });

  if (seat.status !== STATUS_RESERVED) {
    return res.status(409).json({ success: false, message: 'Seat is not reserved' });
  }

  if (seat.reservedBy !== userId) {
    return res.status(403).json({ success: false, message: 'You are not the reserver of this seat' });
  }

  seat.release();
  res.json({ success: true, message: `Seat ${seatNumber} released` });
}
