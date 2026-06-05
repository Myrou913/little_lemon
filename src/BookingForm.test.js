import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

test("renders BookingForm labels", () => {
  render(<BookingForm availableTimes={[]} dispatch={() => {}} />);

  expect(screen.getByText("Choose date")).toBeInTheDocument();
  expect(screen.getByText("Choose time")).toBeInTheDocument();
  expect(screen.getByText("Number of guests")).toBeInTheDocument();
  expect(screen.getByText("Occasion")).toBeInTheDocument();
});