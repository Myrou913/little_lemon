import { useState } from "react";
import BookingForm from "./BookingForm";

function BookingPage({ availableTimes, dispatch, submitForm }) {
  const [bookingData, setBookingData] = useState([]);

  function handleBook(reservation) {
    setBookingData((prev) => [...prev, reservation]);
  }

  return (
    <section className="booking" aria-label="Table reservation">
      <h1>Book a Table</h1>

      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onBook={handleBook}
        submitForm={submitForm}
      />

      {bookingData.length > 0 && (
        <div className="booking-table-wrapper">
          <h2 id="reservations-heading">Your Reservations</h2>
          <table
            className="booking-table"
            aria-label="Reservations summary"
            aria-describedby="reservations-heading"
          >
            <caption className="sr-only">List of your confirmed reservations</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Guests</th>
                <th scope="col">Occasion</th>
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
