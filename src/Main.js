import { Routes, Route } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Little Lemon</h1>
        <p>Mediterranean Restaurant</p>
        <button>Reserve a Table</button>
      </section>

      <section className="highlights">
        <h2>Weekly Specials</h2>
        <div className="cards">
          <div className="card">Dish 1</div>
          <div className="card">Dish 2</div>
          <div className="card">Dish 3</div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Testimonials</h2>
        <p>Customer reviews here...</p>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>Restaurant description...</p>
      </section>
    </>
  );
}

function BookingPage() {
  return (
    <section className="booking">
      <h1>Book a Table</h1>
      <p>Reservation form will go here</p>
    </section>
  );
}

function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<BookingPage />} />
      </Routes>
    </main>
  );
}

export default Main;