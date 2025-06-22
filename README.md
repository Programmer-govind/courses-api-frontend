# Courses Frontend

This is a ReactJS frontend for the IIT Bombay Courses API assignment.

## Features

- Create, list, and delete courses (with multi-select for prerequisites)
- Create, list, and delete course delivery instances
- Show dependency warnings when deletion is not allowed
- Connects to the backend Courses API

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. The app will be available at `http://localhost:5173/`

## Configuration
- Update the backend API URL in the code if needed (default: `http://localhost:8080/api/`).

## Notes
- Requires Node.js 18+ and npm.
- See backend README for API details.
