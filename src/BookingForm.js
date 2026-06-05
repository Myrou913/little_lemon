import { useState } from "react";

function BookingForm({ availableTimes, dispatch, onBook, submitForm }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [error, setError] = useState("");

  function handleDateChange(e) {
    setDate(e.target.value);
    dispatch({ type: "date_change", date: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!date) {
      setError("Please select a date.");
      return;
    }
    if (!time) {
      setError("Please select a time.");
      return;
    }

    const formData = { date, time, guests, occasion };
    onBook(formData);
    submitForm(formData);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <p role="alert" style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <label htmlFor="res-date">Choose date</label>
      <input
        id="res-date"
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={handleDateChange}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      >
        <option value="">-- Select a time --</option>
        {availableTimes &&
          availableTimes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        id="guests"
        type="number"
        value={guests}
        min={1}
        max={10}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Engagement">Engagement</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">Make Your Reservation</button>
    </form>
  );
}

export default BookingForm;
