import { useState } from "react";

/* ── pure validation helpers (easy to unit-test) ── */
export function validateDate(value) {
  if (!value) return "Please select a date.";
  // Compare date strings directly (both are YYYY-MM-DD) to avoid timezone issues
  const today = new Date().toISOString().split("T")[0];
  if (value < today) return "Date cannot be in the past.";
  return "";
}

export function validateTime(value) {
  if (!value) return "Please select a time.";
  return "";
}

export function validateGuests(value) {
  const n = Number(value);
  if (!value && value !== 0) return "Please enter the number of guests.";
  if (n < 1) return "At least 1 guest is required.";
  if (n > 10) return "Maximum 10 guests allowed.";
  return "";
}

export function validateOccasion(value) {
  if (!value) return "Please select an occasion.";
  return "";
}

export function isFormValid({ date, time, guests, occasion }) {
  return (
    !validateDate(date) &&
    !validateTime(time) &&
    !validateGuests(guests) &&
    !validateOccasion(occasion)
  );
}

/* ── component ── */
function BookingForm({ availableTimes, dispatch, onBook, submitForm }) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate]         = useState("");
  const [time, setTime]         = useState("");
  const [guests, setGuests]     = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  // touched tracks whether the user has interacted with a field
  const [touched, setTouched] = useState({
    date: false,
    time: false,
    guests: false,
    occasion: false,
  });

  const errors = {
    date:     validateDate(date),
    time:     validateTime(time),
    guests:   validateGuests(guests),
    occasion: validateOccasion(occasion),
  };

  const formValid = isFormValid({ date, time, guests, occasion });

  function touch(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleDateChange(e) {
    setDate(e.target.value);
    touch("date");
    dispatch({ type: "date_change", date: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Mark everything touched so all errors show on submit attempt
    setTouched({ date: true, time: true, guests: true, occasion: true });
    if (!formValid) return;

    const formData = { date, time, guests, occasion };
    onBook(formData);
    submitForm(formData);
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Reservation form">

      {/* DATE */}
      <div className="form-field">
        <label htmlFor="res-date">Choose date</label>
        <input
          id="res-date"
          type="date"
          value={date}
          min={today}
          onChange={handleDateChange}
          onBlur={() => touch("date")}
          aria-required="true"
          aria-invalid={touched.date && !!errors.date}
          aria-describedby={touched.date && errors.date ? "date-error" : undefined}
          required
        />
        {touched.date && errors.date && (
          <span id="date-error" className="field-error" role="alert">
            {errors.date}
          </span>
        )}
      </div>

      {/* TIME */}
      <div className="form-field">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          value={time}
          onChange={(e) => { setTime(e.target.value); touch("time"); }}
          onBlur={() => touch("time")}
          aria-required="true"
          aria-invalid={touched.time && !!errors.time}
          aria-describedby={touched.time && errors.time ? "time-error" : undefined}
          required
        >
          <option value="">-- Select a time --</option>
          {availableTimes &&
            availableTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
        </select>
        {touched.time && errors.time && (
          <span id="time-error" className="field-error" role="alert">
            {errors.time}
          </span>
        )}
      </div>

      {/* GUESTS */}
      <div className="form-field">
        <label htmlFor="guests">Number of guests</label>
        <input
          id="guests"
          type="number"
          value={guests}
          min={1}
          max={10}
          onChange={(e) => { setGuests(Number(e.target.value)); touch("guests"); }}
          onBlur={() => touch("guests")}
          aria-required="true"
          aria-invalid={touched.guests && !!errors.guests}
          aria-describedby={touched.guests && errors.guests ? "guests-error" : undefined}
          required
        />
        {touched.guests && errors.guests && (
          <span id="guests-error" className="field-error" role="alert">
            {errors.guests}
          </span>
        )}
      </div>

      {/* OCCASION */}
      <div className="form-field">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => { setOccasion(e.target.value); touch("occasion"); }}
          onBlur={() => touch("occasion")}
          aria-required="true"
          aria-invalid={touched.occasion && !!errors.occasion}
          aria-describedby={touched.occasion && errors.occasion ? "occasion-error" : undefined}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Engagement">Engagement</option>
          <option value="Other">Other</option>
        </select>
        {touched.occasion && errors.occasion && (
          <span id="occasion-error" className="field-error" role="alert">
            {errors.occasion}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={!formValid}
        aria-disabled={!formValid}
        style={{ opacity: formValid ? 1 : 0.5, cursor: formValid ? "pointer" : "not-allowed" }}
      >
        Make Your Reservation
      </button>

    </form>
  );
}

export default BookingForm;
