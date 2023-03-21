import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, 'test');
    const errorMessage = await screen.findByText(/firstName must have at least 5 characters./i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    userEvent.click(submitButton);
    const firstNameErrorMessage = await screen.findByText(/firstName must have at least 5 characters./i);
    const lastNameErrorMessage = await screen.findByText(/lastName is a required field./i);
    const emailErrorMessage = await screen.findByText(/email must be a valid email address./i);
    expect(firstNameErrorMessage).toBeInTheDocument();
    expect(lastNameErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(firstNameInput, 'test');
    userEvent.type(lastNameInput, 'test');
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    userEvent.click(submitButton);
    const emailErrorMessage = await screen.findByText(/email must be a valid email address./i);
    expect(emailErrorMessage).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
