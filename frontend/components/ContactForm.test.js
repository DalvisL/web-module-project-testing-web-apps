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
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, 'test');
    const errorMessage = await screen.findByText(/email must be a valid email address./i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i })
    userEvent.type(firstNameInput, 'Testing');
    userEvent.type(emailInput, 'test.user@domain.com');
    userEvent.click(submitButton);
    const errorMessage = await screen.findByText(/lastName is a required field./i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i })
    userEvent.type(firstNameInput, 'Testing');
    userEvent.type(lastNameInput, 'User');
    userEvent.type(emailInput, 'test.user@domain.com');
    userEvent.click(submitButton);  
    const firstNameText = await screen.findByTestId('firstnameDisplay');
    const lastNameText = await screen.findByTestId('lastnameDisplay');
    const emailText = await screen.findByTestId('emailDisplay');
    expect(firstNameText).toBeInTheDocument();
    expect(lastNameText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(screen.queryByTestId('messageDisplay')).not.toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i })
    userEvent.type(firstNameInput, 'Testing');
    userEvent.type(lastNameInput, 'User');
    userEvent.type(emailInput, 'test-user@domain.com');
    userEvent.type(messageInput, 'This is a test message.');
    userEvent.click(submitButton);
    const firstNameText = await screen.findByTestId('firstnameDisplay');
    const lastNameText = await screen.findByTestId('lastnameDisplay');
    const emailText = await screen.findByTestId('emailDisplay');
    const messageText = await screen.findByTestId('messageDisplay');
    expect(firstNameText).toBeInTheDocument();
    expect(lastNameText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
});
