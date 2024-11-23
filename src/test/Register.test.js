// src/test/Register.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Register"; // Adjust this path if necessary
import axios from "../api/axios"; // Mock axios if needed
import React from "react";
// Mocking axios to simulate successful registration response
jest.mock("axios");
import "@testing-library/jest-dom";
describe("Register Component", () => {
  // test("renders register form", () => {
  //   render(<Register />);

  //   // Check if form elements are present
  //   expect(screen.getByLabelText("Username:")).toBeInTheDocument();
  //   expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  //   expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
  //   expect(screen.getByText("Sign Up")).toBeInTheDocument();
  // });

  // test("validates username correctly", () => {
  //   render(<Register />);

  //   const usernameInput = screen.getByLabelText("Username:");
  //   fireEvent.change(usernameInput, { target: { value: "abc" } }); // Invalid username
  //   fireEvent.blur(usernameInput);

  //   const errorMessage = screen.getByText(/4 to 24 characters/i);
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // test("validates password correctly", () => {
  //   render(<Register />);

  //   const passwordInput = screen.getByLabelText("Password:");
  //   fireEvent.change(passwordInput, { target: { value: "short" } }); // Invalid password
  //   fireEvent.blur(passwordInput);

  //   const errorMessage = screen.getByText(/8 to 24 characters/i);
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // test("shows error message for password mismatch", async () => {
  //   render(<Register />);
  //   const passwordInput = screen.getByLabelText("Password:");
  //   const confirmPasswordInput = screen.getByLabelText("Confirm Password:");

  //   fireEvent.change(passwordInput, { target: { value: "Valid1!" } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: "Mismatch1!" } });

  //   const errorMessage = screen.getByText(
  //     /must match the first password input field/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });

  test("submits the form successfully", async () => {
    // Mock the axios post request to simulate a successful response
    axios.post.mockResolvedValueOnce({
      data: { message: "User  registered successfully" },
      accessToken: "mockAccessToken",
    });

    const { debug } = render(<Register />); // Destructure debug from render

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "validUser " },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Valid123!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "Valid123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    const successMessage = await screen.findByText(/success!/i);

    // Assert that the success message is in the document
    expect(successMessage).toBeInTheDocument();

    // Additional assertions to ensure axios.post was called correctly
    expect(axios.post).toHaveBeenCalledWith(
      "/register", // Ensure this matches the API URL in your component
      JSON.stringify({ user: "validUser", pwd: "Valid123!" }),
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  // test("displays error message when registration fails", async () => {
  //   // Mock API error response for Username Taken (409 status)
  //   axios.post.mockRejectedValueOnce({
  //     response: { status: 409, data: { message: "Username Taken" } },
  //   });

  //   // Render the Register component
  //   render(<Register />);

  //   // Find form elements by their label text (you may need to adjust the labels)
  //   const usernameInput = screen.getByLabelText("Username:");
  //   const passwordInput = screen.getByLabelText("Password:");
  //   const confirmPasswordInput = screen.getByLabelText("Confirm Password:");
  //   const submitButton = screen.getByText("Sign Up");

  //   // Simulate user input
  //   fireEvent.change(usernameInput, { target: { value: "ValidUser123" } });
  //   fireEvent.change(passwordInput, { target: { value: "Valid1Password!" } });
  //   fireEvent.change(confirmPasswordInput, {
  //     target: { value: "Valid1Password!" },
  //   });

  //   // Simulate form submission (button click)
  //   fireEvent.click(submitButton);

  //   // Wait for the dynamic error message to appear (using findByText to handle async behavior)
  //   const errorMessage = await screen.findByText((content, element) => {
  //     return element.textContent.includes("Username Taken");
  //   });

  //   // Ensure the error message appears in the document
  //   expect(errorMessage).toBeInTheDocument();
  // });
});
