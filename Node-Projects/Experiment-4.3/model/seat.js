import STATUS from '../constant.js';


class Seat {
  constructor(seatNumber) {
    this.seatNumber = seatNumber;
    this.status = STATUS.STATUS_AVAILABLE;
    this.reservedBy = null;
    this.reservationExpiresAt = null;
  }

  reserve(userId, durationMs) {
    if (this.status !== STATUS.STATUS_AVAILABLE) {
      return { success: false, message: 'Seat is not available for reservation' };
    }
    this.status = STATUS.STATUS_RESERVED;
    this.reservedBy = userId;
    this.reservationExpiresAt = Date.now() + durationMs;
    return { success: true, message: 'Seat reserved successfully' };
  }

  release() {
    this.status = STATUS.STATUS_AVAILABLE;
    this.reservedBy = null;
    this.reservationExpiresAt = null;
  }

  book(userId) {
    if (this.status !== STATUS.STATUS_RESERVED || this.reservedBy !== userId) {
      return { success: false, message: 'You cannot book this seat' };
    }
    this.status = STATUS.STATUS_BOOKED;
    this.reservedBy = null;
    this.reservationExpiresAt = null;
    return { success: true, message: 'Seat booked successfully' };
  }

  isReservationExpired() {
    return this.status === STATUS.STATUS_RESERVED && Date.now() > this.reservationExpiresAt;
  }
}

export default Seat;
