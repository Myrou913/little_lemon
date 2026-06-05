import { Link } from "react-router-dom";

function ConfirmedBooking() {
  return (
    <section className="confirmed-booking">
      <div className="confirmed-booking__card">
        <span className="confirmed-booking__icon" aria-hidden="true">🎉</span>
        <h1>Booking Confirmed!</h1>
        <p>
          Thank you for your reservation at Little Lemon. We look forward to
          seeing you soon!
        </p>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
