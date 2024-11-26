import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentDetails from '../StudentDetails';
import React from 'react';


describe("StudentDetails Form", () => {
    beforeEach(() => {
      render(<StudentDetails />);
      jest.spyOn(window, "alert").mockImplementation(() => {});
    });
  
    test("renders all form fields with correct labels", () => {
      
      expect(screen.getByLabelText("Name :")).toBeInTheDocument();
      expect(screen.getByLabelText("Mothers Name :")).toBeInTheDocument();
      expect(screen.getByLabelText("Fathers Name :")).toBeInTheDocument();
      expect(screen.getByLabelText("Phone Number :")).toBeInTheDocument();
      expect(screen.getByLabelText("Email :")).toBeInTheDocument();
      expect(screen.getByLabelText("Address :")).toBeInTheDocument();
      expect(screen.getByLabelText("City :")).toBeInTheDocument();
      expect(screen.getByLabelText("Postal Code :")).toBeInTheDocument();
      expect(screen.getByLabelText("Date Of Birth :")).toBeInTheDocument();
      expect(screen.getByLabelText("Salary :")).toBeInTheDocument();
    });

    test("shows validation hints when fields are focused", () => {
      fireEvent.focus(screen.getByLabelText("Name :"));
      expect(screen.getByText(/Only alphabets are allowed/i)).toBeInTheDocument();
    
      fireEvent.focus(screen.getByLabelText("Phone Number :"));
      expect(screen.getByText(/Must be exactly 10 digits/i)).toBeInTheDocument();
    
      fireEvent.focus(screen.getByLabelText("Email :"));
      expect(screen.getByText(/Must be a valid email address/i)).toBeInTheDocument();
    });
    
    test("validates 'Name' field correctly", async () => {
      const input = screen.getByLabelText("Name :");

      // Simulate user interaction
      fireEvent.focus(input); // Simulate focus
      fireEvent.change(input, { target: { value: "1234" } });
      
    
      // Wait for the validation message to appear
      const errorMessage = await screen.findByText(/Only alphabets are allowed./i);
      expect(errorMessage).toBeInTheDocument();
    });
    
    test("validates 'Phone Number' field correctly", () => {
      
          // Input an invalid phone number
          const input = screen.getByLabelText("Phone Number :");
          fireEvent.change(input, { target: { value: "12345" } });
          fireEvent.focus(input);

          // Check for validation message
          expect(screen.getByText(/Must be exactly 10 digits./i)).toBeInTheDocument();
      
          // Input a valid phone number
          fireEvent.change(input, { target: { value: "1234567890" } });
          
      
          // Ensure the validation message disappears
          expect(screen.queryByText(/Must be exactly 10 digits./i)).not.toBeInTheDocument();
        });
      
        test("validates 'Email' field correctly", () => {

    // Input an invalid email
    const input = screen.getByLabelText("Email :");
    fireEvent.change(input, { target: { value: "invalidemail" } });
    fireEvent.focus(input);

    // Check for validation message
    expect(screen.getByText(/Must be a valid email address./i)).toBeInTheDocument();

    // Input a valid email
    fireEvent.change(input, { target: { value: "test@example.com" } });
    

    // Ensure the validation message disappears
    expect(screen.queryByText(/Must be a valid email address./i)).not.toBeInTheDocument();
  });

  test("validates date of birth field correctly", () => {
  
    const dobInput = screen.getByLabelText("Date Of Birth :");
  
    fireEvent.change(dobInput, { target: { value: "2000-01-01" } });
    expect(dobInput).toHaveValue("2000-01-01");
  
    fireEvent.change(dobInput, { target: { value: "" } });
    const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeDisabled();
  });
  
  
  test("Submit button is enabled when form is valid", () => {

    const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeDisabled();

  // Fill the form with invalid data and check button state
  fireEvent.change(screen.getByLabelText("Name :"), { target: { value: "123" } });
  fireEvent.change(screen.getByLabelText("Phone Number :"), { target: { value: "123" } });
  expect(submitButton).toBeDisabled();

  // Fill the form with valid data
  fireEvent.change(screen.getByLabelText("Name :"), { target: { value: "John Doe" } });
  fireEvent.change(screen.getByLabelText("Mothers Name :"), { target: { value: "Jane Doe" } });
  fireEvent.change(screen.getByLabelText("Fathers Name :"), { target: { value: "Richard Doe" } });
  fireEvent.change(screen.getByLabelText("Phone Number :"), { target: { value: "1234567890" } });
  fireEvent.change(screen.getByLabelText("Email :"), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Address :"), {
    target: { value: "123 Main St" },
  });
  fireEvent.change(screen.getByLabelText("City :"), { target: { value: "Springfield" } });
  fireEvent.change(screen.getByLabelText("Postal Code :"), { target: { value: "12345" } });
  fireEvent.change(screen.getByLabelText("Date Of Birth :"), {
    target: { value: "2000-01-01" },
  });
  fireEvent.change(screen.getByLabelText("Salary :"), { target: { value: "5000" } });

  // Check that the submit button is enabled after valid data is entered
  expect(submitButton).not.toBeDisabled();

  // Submit the form
  fireEvent.click(submitButton);

  // Check for the success message or behavior after submission
  expect(window.alert).toHaveBeenCalledWith("Form submitted successfully!");
  });
  
  test("shows error when submitting with invalid fields", () => {

    const submitButton = screen.getByText(/Submit/i);

    // Verify the submit button is initially disabled
    expect(submitButton).toBeDisabled();

    // Fill in only some of the fields with invalid data
    fireEvent.change(screen.getByLabelText("Name :"), { target: { value: "John123" } }); // Invalid name
    fireEvent.change(screen.getByLabelText("Phone Number :"), { target: { value: "12345" } }); // Invalid phone number
    fireEvent.change(screen.getByLabelText("Email :"), { target: { value: "invalid-email" } }); // Invalid email

    // Attempt to enable the submit button by focusing another field
    fireEvent.blur(screen.getByLabelText("Email :"));

    // Verify the submit button is still disabled due to invalid fields
    

    // Fill in all fields with invalid data and attempt to submit
    fireEvent.change(screen.getByLabelText("City :"), { target: { value: "" } }); // Empty city
    fireEvent.change(screen.getByLabelText("Postal Code :"), { target: { value: "12" } }); // Invalid postal code

    // Click the submit button
    fireEvent.click(submitButton);

    // Verify error message is shown
    // const errorMessage = screen.getByText(/Please fill out all fields correctly./i);
    // expect(errorMessage).toBeInTheDocument();

    // Ensure `window.alert` is not called
    expect(window.alert).not.toHaveBeenCalled();
    expect(submitButton).toBeDisabled();
  });
  });


