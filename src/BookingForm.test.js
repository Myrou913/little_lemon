import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

const defaultProps = {
  availableTimes: ["17:00", "18:00"],
  dispatch: jest.fn(),
  onBook: jest.fn(),
  submitForm: jest.fn(),
};

test("renders BookingForm labels", () => {
  render(<BookingForm {...defaultProps} />);

  expect(screen.getByText("Choose date")).toBeInTheDocument();
  expect(screen.getByText("Choose time")).toBeInTheDocument();
  expect(screen.getByText("Number of guests")).toBeInTheDocument();
  expect(screen.getByText("Occasion")).toBeInTheDocument();
});

test("shows error when submitting without a date", async () => {
  render(<BookingForm {...defaultProps} />);
  fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent(/please select a date/i);
});

test("calls submitForm and onBook with form data on valid submission", () => {
  const submitForm = jest.fn();
  const onBook = jest.fn();

  render(
    <BookingForm
      availableTimes={["17:00", "18:00"]}
      dispatch={jest.fn()}
      onBook={onBook}
      submitForm={submitForm}
    />
  );

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2026-12-25" },
  });
  fireEvent.change(screen.getByLabelText(/choose time/i), {
    target: { value: "17:00" },
  });
  fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

  expect(submitForm).toHaveBeenCalledWith(
    expect.objectContaining({ date: "2026-12-25", time: "17:00" })
  );
  expect(onBook).toHaveBeenCalledWith(
    expect.objectContaining({ date: "2026-12-25", time: "17:00" })
  );
});
