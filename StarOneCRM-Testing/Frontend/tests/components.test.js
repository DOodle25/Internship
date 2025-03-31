// Import necessary modules and dependencies
import { render, screen } from "@testing-library/react";
import AddStudent from "../src/components/Admin/AddStudent";

// Test cases for AddStudent Component
describe("AddStudent Component Tests", () => {
  test("should render the AddStudent form", () => {
    render(<AddStudent />);
    const formElement = screen.getByTestId("add-student-form");
    expect(formElement).toBeInTheDocument();
  });

  test("should display a submit button", () => {
    render(<AddStudent />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });
});
