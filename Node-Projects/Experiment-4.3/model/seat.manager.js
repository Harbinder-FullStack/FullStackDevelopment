// models/SeatManager.js
import Seat from './seat.js';

class SeatManager {
  constructor(totalSeats) {
    // dictionary of seatNumber → Seat object
    this.seats = new Map();

    // Initialize seats, e.g., A-1 to A-10, B-1 to B-10, C-1 to C-10
    const rows = ['A', 'B', 'C'];
    for (const row of rows) {
        for (let n = 1; n <= totalSeats; n++) {
            const id = `${row}-${n}`;
            this.seats.set(id, new Seat(id));
        }
    }
  }

  getAllSeats() {
    return Array.from(this.seats.values());
  }

  getSeat(seatNumber) {
    return this.seats.get(seatNumber);
  }

  cleanupExpiredReservations() {
    this.seats.forEach(seat => {
      if (seat.isReservationExpired()) {
        seat.release();
      }
    });
  }
}

export default SeatManager;
