import { useState } from "react";
import BookingForm from "./BookingForm";

function BookingPage({ availableTimes, dispatch, submitForm }) {
  const [bookingData, setBookingData] = useState([]);

  function handleBook(reservation) {
    setBookingData((prev) => [...prev, reservation]);
  }

  return (
    <section className="booking">
      <h1>Book a Table</h1>

      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onBook={handleBook}
        submitForm={submitForm}
      />

      {bookingData.length > 0 && (
        <div className="booking-table-wrapper">
          <h2>Your Reservations</h2>
          <table className="booking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Occasion</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.guests}</td>
                  <td>{entry.occasion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BookingPage;
