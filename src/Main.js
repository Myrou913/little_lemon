import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";
import { fetchAPI, submitAPI } from "./api";

/* HOME PAGE */
function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero" aria-label="Hero section">
        <h1>Little Lemon</h1>
        <p>Mediterranean Restaurant</p>
        <button
          aria-label="On Click"
          onClick={() => navigate("/reservations")}
        >
          Reserve a Table
        </button>
      </section>

      <section className="highlights" aria-label="Weekly specials">
        <h2>Weekly Specials</h2>
      </section>
    </>
  );
}

/* INIT */
export function initializeTimes() {
  const today = new Date();
  return fetchAPI(today);
}

/* REDUCER */
export function updateTimes(state, action) {
  if (action.type === "date_change") {
    return fetchAPI(new Date(action.date));
  }
  return state;
}

function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );
  const navigate = useNavigate();

  function submitForm(formData) {
    const success = submitAPI(formData);
    if (success) {
      navigate("/confirmed");
    }
  }

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/reservations"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />

        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;
