import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { initializeTimes, updateTimes } from "./Main";
import * as api from "./api";

// Mock the api module
jest.mock("./api", () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(() => true),
}));

// ─── initializeTimes ───────────────────────────────────────────────────────

describe("initializeTimes", () => {
  test("returns a non-empty array of available times", () => {
    api.fetchAPI.mockReturnValue(["17:00", "17:30", "18:00"]);

    const times = initializeTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  test("calls fetchAPI with today's date", () => {
    api.fetchAPI.mockReturnValue(["17:00"]);

    initializeTimes();

    expect(api.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  });
});

// ─── updateTimes ───────────────────────────────────────────────────────────

describe("updateTimes", () => {
  test("returns new times when action type is date_change", () => {
    const newTimes = ["18:00", "18:30", "19:00"];
    api.fetchAPI.mockReturnValue(newTimes);

    const result = updateTimes([], {
      type: "date_change",
      date: "2026-12-25",
    });

    expect(result).toEqual(newTimes);
    expect(api.fetchAPI).toHaveBeenCalledWith(new Date("2026-12-25"));
  });

  test("returns the current state unchanged for an unknown action", () => {
    const currentState = ["17:00", "17:30"];

    const result = updateTimes(currentState, { type: "unknown_action" });

    expect(result).toEqual(currentState);
  });
});

// ─── App rendering ─────────────────────────────────────────────────────────

test("renders the Little Lemon header logo", () => {
  api.fetchAPI.mockReturnValue(["17:00", "17:30", "18:00"]);

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByAltText(/little lemon logo/i)).toBeInTheDocument();
});

test("renders navigation links", () => {
  api.fetchAPI.mockReturnValue(["17:00", "17:30", "18:00"]);

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/reservations/i)).toBeInTheDocument();
});
