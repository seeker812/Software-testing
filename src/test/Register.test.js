// src/test/Register.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Register"; // Adjust this path if necessary
import axios from "../api/axios"; // Mock axios if needed
import React from "react";
// Mocking axios to simulate successful registration response
jest.mock("../api/axios");

import "@testing-library/jest-dom";
describe("Register Component", () => {
  test("renders register form", () => {
    render(<Register />);

    // Check if form elements are present
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("validates username correctly", () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText("Username:");
    fireEvent.change(usernameInput, { target: { value: "abc" } }); // Invalid username
    fireEvent.blur(usernameInput);

    const errorMessage = screen.getByText(/4 to 24 characters/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("validates password correctly", () => {
    render(<Register />);

    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "short" } }); // Invalid password
    fireEvent.blur(passwordInput);

    const errorMessage = screen.getByText(/8 to 24 characters/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows error message for password mismatch", async () => {
    render(<Register />);
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");

    fireEvent.change(passwordInput, { target: { value: "Valid1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Mismatch1!" } });

    const errorMessage = screen.getByText(
      /must match the first password input field/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    // Mock the axios post request
    axios.post.mockResolvedValueOnce({
      data: { message: "User registered successfully", accessToken: "mockAccessToken" },
    });
  
    const { debug } = render(<Register />); // Debug to inspect the DOM if needed
  
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "validUser" }, // Ensure no trailing spaces
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Valid123!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "Valid123!" },
    });
  
    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
  
    // Wait for the success message to appear
    const successMessage = await screen.findByText(/success/i);
  
    // Assert the success message is displayed
    expect(successMessage).toBeInTheDocument();
  
    // Assert axios.post was called with the correct arguments
   expect(axios.post).toHaveBeenCalledWith(
  "/register",
  JSON.stringify({ user: "validUser", pwd: "Valid123!" }), // Match the JSON string
  expect.objectContaining({
    headers: { "Content-Type": "application/json" },
  })
);

  });
test("handles server error response", async () => {
  // Mock the axios post request to simulate a server error
  axios.post.mockRejectedValueOnce({
    response: { status: 500 },
  });

  render(<Register />);

  // Fill in the form fields with valid values
  fireEvent.change(screen.getByLabelText("Username:"), {
    target: { value: "validUser" },
  });
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "Valid123!" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), {
    target: { value: "Valid123!" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  // Wait for the error message to appear
  const errorMessage = await screen.findByText(/registration failed/i);

  // Assert the error message is displayed
  expect(errorMessage).toBeInTheDocument();

  // Assert axios.post was called
  expect(axios.post).toHaveBeenCalledTimes(1);
});

test("prevents submission with invalid inputs", () => {
  render(<Register />);

  // Fill in invalid username and password
  fireEvent.change(screen.getByLabelText("Username:"), {
    target: { value: "abc" }, // Invalid username
  });
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "short" }, // Invalid password
  });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), {
    target: { value: "short" },
  });

  // Attempt to submit the form
  const submitButton = screen.getByRole("button", { name: /sign up/i });
  expect(submitButton).toBeDisabled();
});
test("displays error message for duplicate username", async () => {
  // Mock the axios post request to simulate a conflict error
  axios.post.mockRejectedValueOnce({
    response: { status: 409 },
  });

  render(<Register />);

  // Fill in the form fields with valid values
  fireEvent.change(screen.getByLabelText("Username:"), {
    target: { value: "existingUser" },
  });
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "Valid123!" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), {
    target: { value: "Valid123!" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  // Wait for the error message to appear
  const errorMessage = await screen.findByText(/username taken/i);

  // Assert the error message is displayed
  expect(errorMessage).toBeInTheDocument();

  // Assert axios.post was called
  expect(axios.post).toHaveBeenCalledTimes(1);
});
test("validates password complexity edge cases", () => {
  render(<Register />);

  const passwordInput = screen.getByLabelText("Password:");

  // Test password missing a special character
  fireEvent.change(passwordInput, { target: { value: "Valid123" } });
  fireEvent.blur(passwordInput);

  const errorMessage = screen.getByText(/must include uppercase/i);
  expect(errorMessage).toBeInTheDocument();
});

test("displays 'No Server Response' on network failure", async () => {
  // Mock axios to simulate a network error
  axios.post.mockRejectedValueOnce({});

  render(<Register />);

  // Fill in the form fields with valid values
  fireEvent.change(screen.getByLabelText("Username:"), {
    target: { value: "validUser" },
  });
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "Valid123!" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password:"), {
    target: { value: "Valid123!" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  // Wait for the error message to appear
  const errorMessage = await screen.findByText(/no server response/i);

  // Assert the error message is displayed
  expect(errorMessage).toBeInTheDocument();

  // Assert axios.post was called
  expect(axios.post).toHaveBeenCalledTimes(1);
});
test("prevents submission when fields are empty", () => {
  render(<Register />);

  const submitButton = screen.getByRole("button", { name: /sign up/i });

  // Initially, all fields are empty, so the button should be disabled
  expect(submitButton).toBeDisabled();

  // Enter a valid username but leave other fields empty
  fireEvent.change(screen.getByLabelText("Username:"), {
    target: { value: "validUser" },
  });
  expect(submitButton).toBeDisabled();

  // Fill password but leave confirm password empty
  fireEvent.change(screen.getByLabelText("Password:"), {
    target: { value: "Valid123!" },
  });
  expect(submitButton).toBeDisabled();
});
test("username field gets auto-focused on render", () => {
  render(<Register />);

  // Assert that the username field is focused
  const usernameInput = screen.getByLabelText("Username:");
  expect(usernameInput).toHaveFocus();
});

});
