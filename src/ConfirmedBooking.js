import { Link } from "react-router-dom";

function ConfirmedBooking() {
  return (
    <section className="confirmed-booking" aria-label="Booking confirmation">
      <div className="confirmed-booking__card" role="status" aria-live="polite">
        <span className="confirmed-booking__icon" aria-hidden="true">🎉</span>
        <h1>Booking Confirmed!</h1>
        <p>
          Thank you for your reservation at Little Lemon. We look forward to
          seeing you soon!
        </p>
        {/* Use Link styled as a button — avoids nesting interactive elements */}
        <Link
          to="/"
          className="btn-primary"
          aria-label="Go back to the home page"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
