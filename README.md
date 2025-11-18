# User Management Application

This is a full-stack React application demonstrating user CRUD (Create, Read, Update, Delete) functionality with enhanced UI/UX.

## Features

- View user list fetched from JSONPlaceholder API
- Add new users with a form
- Edit existing users
- Delete users with a confirmation modal
- Responsive design with Tailwind CSS
- Toast notifications for success and error feedback
- Client-side state management for immediate UI updates
- React Router v6 for navigation
- Loading spinners for data fetching and form submission

## Technologies Used

- React 18+
- React Router v6
- Tailwind CSS
- JSONPlaceholder fake REST API

## Project Structure

- `src/App.js` — Main app and routing logic, global user state, toast and confirm modal
- `src/components/UserList.js` — User list table with edit/delete buttons
- `src/components/UserForm.js` — User add/edit form with validation and loading states
- `src/components/Toast.js` — Toast notifications for feedback
- `src/components/ConfirmModal.js` — Modal dialog for delete confirmation

## Installation & Running Locally

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the dev server with `npm start`
4. Open http://localhost:3000 in your browser

## Usage

- Navigate between pages using links in the header
- Add or edit users via forms
- Confirm user deletion via modal dialog
- View toast messages on actions


