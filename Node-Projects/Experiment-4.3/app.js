// app.js
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

/**
 * CONFIG
 */
const LOCK_TTL_MS = 60_000; // 1 minute

/**
 * In-memory store
 * seats: Map<seatId, { status: 'available'|'locked'|'booked', lock?: { userId, lockId, expiresAt, timeoutHandle } }>
 */
const seats = new Map();

/**
 * Initialize seat map (e.g., rows A-C, seats 1-10 -> A1..A10, B1..B10, C1..C10)
 */
(function initSeats() {
  const rows = ['A', 'B', 'C'];
  for (const row of rows) {
    for (let n = 1; n <= 10; n++) {
      const id = `${row}${n}`;
      seats.set(id, { status: 'available' });
    }
  }
})();

/**
 * Helpers
 */
function now() {
  return Date.now();
}

function getSeatOr404(id, res) {
  const seat = seats.get(id);
  if (!seat) {
    res.status(404).json({ error: `Seat ${id} not found` });
    return null;
  }
  return seat;
}

function isLockExpired(seat) {
  return seat.lock && seat.lock.expiresAt <= now();
}

// Clear a seat's lock timeout if present
function clearLockTimer(seat) {
  if (seat.lock?.timeoutHandle) {
    clearTimeout(seat.lock.timeoutHandle);
    seat.lock.timeoutHandle = null;
  }
}

// Set/restart auto-expiry timer for a lock
function startLockTimer(seat, seatId) {
  clearLockTimer(seat);
  const ms = seat.lock.expiresAt - now();
  seat.lock.timeoutHandle = setTimeout(() => {
    // Auto-release the lock if still locked and expired.
    // Not in case its already booked or re-locked.
    const current = seats.get(seatId);
    if (current && current.status === 'locked' && isLockExpired(current)) {
      current.status = 'available';
      clearLockTimer(current);
      current.lock = undefined;
      // (Optional) console.log(`[auto-expire] Seat ${seatId} lock expired`);
    }
  }, Math.max(0, ms));
}

/**
 * PUBLIC ENDPOINTS
 */

// List all seats with status
app.get('/seats', (req, res) => {
  const data = [];
  for (const [id, seat] of seats) {
    data.push({
      id,
      status: seat.status,
      // expose whether it's locked (without revealing userId)
      lockedUntil: seat.lock && !isLockExpired(seat) ? seat.lock.expiresAt : null,
    });
  }
  res.json({ count: data.length, seats: data });
});

// Reserves a seat (POST /reserve { seatId, userId, ttlMs? })
app.post('/reserve', (req, res) => {
  const { seatId, userId, ttlMs } = req.body || {};
  if (!seatId || !userId) {
    return res.status(400).json({ error: 'seatId and userId are required' });
  }

  const seat = getSeatOr404(seatId, res);
  if (!seat) return;

  // If seat is booked, no locking allowed
  if (seat.status === 'booked') {
    return res.status(409).json({ error: `Seat ${seatId} is already booked` });
  }

  // If locked, check expiry or same user
  if (seat.status === 'locked') {
    if (isLockExpired(seat)) {
      // treat as available (lock expired)
      seat.status = 'available';
      clearLockTimer(seat);
      seat.lock = undefined;
    } else if (seat.lock.userId !== userId) {
      // Another user holds a valid lock
      return res.status(409).json({
        error: `Seat ${seatId} is already locked by another user`,
        lockedUntil: seat.lock.expiresAt,
      });
    } else {
      // Same user re-locking -> extend lock
      const newTtl = typeof ttlMs === 'number' && ttlMs > 0 ? Math.min(ttlMs, 5 * LOCK_TTL_MS) : LOCK_TTL_MS;
      seat.lock.expiresAt = now() + newTtl;
      startLockTimer(seat, seatId);
      return res.json({
        message: `Seat ${seatId} lock extended`,
        seatId,
        lockId: seat.lock.lockId,
        lockedUntil: seat.lock.expiresAt,
        ttlMs: newTtl,
      });
    }
  }

  // Lock the seat
  if (seat.status === 'available') {
    const ttl = typeof ttlMs === 'number' && ttlMs > 0 ? Math.min(ttlMs, 5 * LOCK_TTL_MS) : LOCK_TTL_MS;
    const lockId = crypto.randomUUID();
    seat.status = 'locked';
    seat.lock = {
      userId,
      lockId,
      expiresAt: now() + ttl,
      timeoutHandle: null,
    };
    startLockTimer(seat, seatId);
    return res.status(200).json({
      message: `Seat ${seatId} locked`,
      seatId,
      lockId,
      lockedUntil: seat.lock.expiresAt,
      ttlMs: ttl,
    });
  }

  // Should not reach here, but just in case:
  res.status(409).json({ error: `Seat ${seatId} cannot be locked` });
});

// Confirm a booking (POST /confirm { seatId, userId, lockId })
app.post('/confirm', (req, res) => {
  const { seatId, userId, lockId } = req.body || {};
  if (!seatId || !userId || !lockId) {
    return res.status(400).json({ error: 'seatId, userId and lockId are required' });
  }

  const seat = getSeatOr404(seatId, res);
  if (!seat) return;

  if (seat.status === 'booked') {
    return res.status(409).json({ error: `Seat ${seatId} is already booked` });
  }

  if (seat.status !== 'locked' || !seat.lock) {
    return res.status(409).json({ error: `Seat ${seatId} is not locked` });
  }

  if (isLockExpired(seat)) {
    seat.status = 'available';
    clearLockTimer(seat);
    seat.lock = undefined;
    return res.status(409).json({ error: `Lock expired for seat ${seatId}` });
  }

  if (seat.lock.userId !== userId || seat.lock.lockId !== lockId) {
    return res.status(403).json({ error: 'You do not hold the lock for this seat' });
  }

  // Confirm booking
  clearLockTimer(seat);
  seat.status = 'booked';
  seat.lock = undefined;

  return res.json({ message: `Seat ${seatId} booked successfully`, seatId });
});

// Optional: release lock early (POST /release { seatId, userId, lockId })
app.post('/release', (req, res) => {
  const { seatId, userId, lockId } = req.body || {};
  if (!seatId || !userId || !lockId) {
    return res.status(400).json({ error: 'seatId, userId and lockId are required' });
  }

  const seat = getSeatOr404(seatId, res);
  if (!seat) return;

  if (seat.status !== 'locked' || !seat.lock) {
    return res.status(409).json({ error: `Seat ${seatId} is not locked` });
  }

  if (seat.lock.userId !== userId || seat.lock.lockId !== lockId) {
    return res.status(403).json({ error: 'You do not hold the lock for this seat' });
  }

  clearLockTimer(seat);
  seat.status = 'available';
  seat.lock = undefined;
  return res.json({ message: `Seat ${seatId} lock released` });
});

// Health
app.get('/health', (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Ticket system running on http://localhost:${PORT}`);
});
