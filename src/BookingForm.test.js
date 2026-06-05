import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm, {
  validateDate,
  validateTime,
  validateGuests,
  validateOccasion,
  isFormValid,
} from "./BookingForm";

const today    = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
const pastDate = "2000-01-01";

const defaultProps = {
  availableTimes: ["17:00", "18:00"],
  dispatch:   jest.fn(),
  onBook:     jest.fn(),
  submitForm: jest.fn(),
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — HTML5 attribute validation
// ─────────────────────────────────────────────────────────────────────────────

describe("HTML5 attribute validation", () => {
  beforeEach(() => render(<BookingForm {...defaultProps} />));

  // Form
  test("form has accessible aria-label", () => {
    expect(screen.getByRole("form", { name: /reservation form/i })).toBeInTheDocument();
  });

  // Date input
  test("date input has type='date'", () => {
    expect(screen.getByLabelText(/choose date/i)).toHaveAttribute("type", "date");
  });

  test("date input has required attribute", () => {
    expect(screen.getByLabelText(/choose date/i)).toBeRequired();
  });

  test("date input has aria-required='true'", () => {
    expect(screen.getByLabelText(/choose date/i)).toHaveAttribute("aria-required", "true");
  });

  test("date input min is set to today", () => {
    expect(screen.getByLabelText(/choose date/i)).toHaveAttribute("min", today);
  });

  // Time select
  test("time select has required attribute", () => {
    expect(screen.getByLabelText(/choose time/i)).toBeRequired();
  });

  test("time select has aria-required='true'", () => {
    expect(screen.getByLabelText(/choose time/i)).toHaveAttribute("aria-required", "true");
  });

  test("time select renders available time options", () => {
    expect(screen.getByRole("option", { name: "17:00" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "18:00" })).toBeInTheDocument();
  });

  // Guests input
  test("guests input has type='number'", () => {
    expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute("type", "number");
  });

  test("guests input has required attribute", () => {
    expect(screen.getByLabelText(/number of guests/i)).toBeRequired();
  });

  test("guests input has aria-required='true'", () => {
    expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute("aria-required", "true");
  });

  test("guests input min is 1", () => {
    expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute("min", "1");
  });

  test("guests input max is 10", () => {
    expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute("max", "10");
  });

  // Occasion select
  test("occasion select renders all options", () => {
    expect(screen.getByRole("option", { name: "Birthday" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Anniversary" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Engagement" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Other" })).toBeInTheDocument();
  });

  // Submit button
  test("submit button has type='submit'", () => {
    expect(screen.getByRole("button", { name: /make your reservation/i })).toHaveAttribute(
      "type",
      "submit"
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — JavaScript validation functions (valid & invalid states)
// ─────────────────────────────────────────────────────────────────────────────

describe("validateDate", () => {
  // Invalid states
  test("returns error message for empty string", () => {
    expect(validateDate("")).toBeTruthy();
  });
  test("returns error message for a past date", () => {
    expect(validateDate(pastDate)).toBeTruthy();
  });
  test("error message mentions 'past' for past date", () => {
    expect(validateDate(pastDate)).toMatch(/past/i);
  });

  // Valid states
  test("returns empty string for today", () => {
    expect(validateDate(today)).toBe("");
  });
  test("returns empty string for a future date", () => {
    expect(validateDate(tomorrow)).toBe("");
  });
});

describe("validateTime", () => {
  // Invalid states
  test("returns error message for empty string", () => {
    expect(validateTime("")).toBeTruthy();
  });

  // Valid states
  test("returns empty string for '17:00'", () => {
    expect(validateTime("17:00")).toBe("");
  });
  test("returns empty string for '23:30'", () => {
    expect(validateTime("23:30")).toBe("");
  });
});

describe("validateGuests", () => {
  // Invalid states
  test("returns error message for 0 guests", () => {
    expect(validateGuests(0)).toBeTruthy();
  });
  test("returns error message for negative guests", () => {
    expect(validateGuests(-1)).toBeTruthy();
  });
  test("returns error message for more than 10 guests", () => {
    expect(validateGuests(11)).toBeTruthy();
  });
  test("error mentions 'Maximum' for value above 10", () => {
    expect(validateGuests(11)).toMatch(/maximum/i);
  });

  // Valid states — boundary values
  test("returns empty string for minimum (1 guest)", () => {
    expect(validateGuests(1)).toBe("");
  });
  test("returns empty string for a mid-range value (5 guests)", () => {
    expect(validateGuests(5)).toBe("");
  });
  test("returns empty string for maximum (10 guests)", () => {
    expect(validateGuests(10)).toBe("");
  });
});

describe("validateOccasion", () => {
  // Invalid states
  test("returns error message for empty string", () => {
    expect(validateOccasion("")).toBeTruthy();
  });

  // Valid states
  test("returns empty string for 'Birthday'", () => {
    expect(validateOccasion("Birthday")).toBe("");
  });
  test("returns empty string for 'Anniversary'", () => {
    expect(validateOccasion("Anniversary")).toBe("");
  });
  test("returns empty string for 'Engagement'", () => {
    expect(validateOccasion("Engagement")).toBe("");
  });
  test("returns empty string for 'Other'", () => {
    expect(validateOccasion("Other")).toBe("");
  });
});

describe("isFormValid", () => {
  const valid = { date: tomorrow, time: "17:00", guests: 2, occasion: "Birthday" };

  // Invalid states — one field invalid at a time
  test("returns false when date is empty", () => {
    expect(isFormValid({ ...valid, date: "" })).toBe(false);
  });
  test("returns false when date is in the past", () => {
    expect(isFormValid({ ...valid, date: pastDate })).toBe(false);
  });
  test("returns false when time is empty", () => {
    expect(isFormValid({ ...valid, time: "" })).toBe(false);
  });
  test("returns false when guests is 0", () => {
    expect(isFormValid({ ...valid, guests: 0 })).toBe(false);
  });
  test("returns false when guests exceeds 10", () => {
    expect(isFormValid({ ...valid, guests: 11 })).toBe(false);
  });
  test("returns false when occasion is empty", () => {
    expect(isFormValid({ ...valid, occasion: "" })).toBe(false);
  });

  // Valid state
  test("returns true when all fields are valid", () => {
    expect(isFormValid(valid)).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Component behaviour
// ─────────────────────────────────────────────────────────────────────────────

describe("BookingForm component behaviour", () => {
  test("renders all form labels", () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByText("Choose date")).toBeInTheDocument();
    expect(screen.getByText("Choose time")).toBeInTheDocument();
    expect(screen.getByText("Number of guests")).toBeInTheDocument();
    expect(screen.getByText("Occasion")).toBeInTheDocument();
  });

  test("submit button is disabled when form is invalid on mount", () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByRole("button", { name: /make your reservation/i })).toBeDisabled();
  });

  test("submit button is enabled once date and time are filled", () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: tomorrow } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: "17:00" } });
    expect(screen.getByRole("button", { name: /make your reservation/i })).not.toBeDisabled();
  });

  test("date field shows error after blur with no value", () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.blur(screen.getByLabelText(/choose date/i));
    expect(screen.getByRole("alert")).toHaveTextContent(/please select a date/i);
  });

  test("time field shows error after blur with no selection", () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.blur(screen.getByLabelText(/choose time/i));
    expect(screen.getByRole("alert")).toHaveTextContent(/please select a time/i);
  });

  test("guests field shows error after blur when value is out of range", () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: "15" } });
    fireEvent.blur(screen.getByLabelText(/number of guests/i));
    expect(screen.getByRole("alert")).toHaveTextContent(/maximum/i);
  });

  test("clicking submit with invalid form shows all field errors", () => {
    render(<BookingForm {...defaultProps} />);
    // Submit the form directly (button is disabled, so fire submit on the form)
    fireEvent.submit(screen.getByRole("form", { name: /reservation form/i }));
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(2);
  });

  test("date field marks aria-invalid true after blur with no value", () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.blur(screen.getByLabelText(/choose date/i));
    expect(screen.getByLabelText(/choose date/i)).toHaveAttribute("aria-invalid", "true");
  });

  test("date field marks aria-invalid false after valid date entered", () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: tomorrow } });
    expect(screen.getByLabelText(/choose date/i)).toHaveAttribute("aria-invalid", "false");
  });

  test("calls submitForm and onBook with correct form data on valid submission", () => {
    const submitForm = jest.fn();
    const onBook     = jest.fn();
    render(
      <BookingForm
        availableTimes={["17:00", "18:00"]}
        dispatch={jest.fn()}
        onBook={onBook}
        submitForm={submitForm}
      />
    );
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: tomorrow } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: "17:00" } });
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenCalledWith(
      expect.objectContaining({ date: tomorrow, time: "17:00" })
    );
    expect(onBook).toHaveBeenCalledTimes(1);
    expect(onBook).toHaveBeenCalledWith(
      expect.objectContaining({ date: tomorrow, time: "17:00" })
    );
  });

  test("does not call submitForm when form is invalid", () => {
    const submitForm = jest.fn();
    render(
      <BookingForm
        {...defaultProps}
        submitForm={submitForm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));
    expect(submitForm).not.toHaveBeenCalled();
  });
});
