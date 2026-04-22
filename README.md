# Student Team Members Management Application

## Project Description
The Student Team Members Management Application is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application. It is designed to manage and display information about student team members. Users can add new team members with detailed information (including Roll Number, Degree, Hobbies, etc.) and upload profile pictures. The app stores all data in a local MongoDB database and serves it through a REST API.

## Installation Steps

Install Backend Dependencies:

Bash
cd backend
npm install
Install Frontend Dependencies:

Bash
cd ../frontend
npm install
How to Run the App
To run the application, you need to start both the backend server and the frontend development server simultaneously. Ensure your local MongoDB server (e.g., MongoDB Compass) is running on port 27017.

Start the Backend:
Open a terminal in the backend folder and run:

Bash
npm run dev
(The server will run on http://localhost:5000)

Start the Frontend:
Open a second terminal in the frontend folder and run:

Bash
npm run dev
(The React app will open in your browser at http://localhost:5173)

API Endpoints
The backend exposes the following REST API endpoints:

GET /api/members : Fetches a list of all team members.

GET /api/members/:id : Fetches the detailed profile of a specific team member by their ID.

POST /api/members : Adds a new team member to the database (Expects form data including an image file upload).
