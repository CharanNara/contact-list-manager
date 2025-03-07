# Contact List Manager
A simple web application project to manage a contact list with the ability to add, search, and delete contacts. The application uses a React frontend with a Node.js backend.

### Project Structure
- public/: Contains the static files for the React app (e.g., index.html, images).
- src/: Contains the React components and styles.
- server/: Contains the backend code, including the API and logic to handle contacts.
- .gitignore: Specifies files and directories to be ignored by Git (example: node_modules).

Setup Instructions
1. Clone the repository
    git clone https://github.com/CharanNara/contact-list-manager.git
    cd contact-list-manager-linq

2. Install dependencies
You need to install both frontend and backend dependencies.

  a. Frontend (React)
    In the project root, navigate to the src directory and install React dependencies:
      cd src
      npm install

  b.  Backend (Node.js)
    Navigate to the server directory and install the backend dependencies:
    cd ../server
    npm install

3. Start the development servers
  Start the frontend React app:
   In the src, run the following command:
     npm start

  Start the backend Node.js server:
    In the server directory, run the following command:
      node server.js
    The backend will run on http://localhost:5001, providing API endpoints to manage contacts.

### Features
  - Add a contact: Enter a name and email to add a new contact to the list.
  - Search contacts: Search for contacts by name or email.
  - Delete a contact: Remove contacts from the list.

### Approach & Design Decisions
  1. Frontend
    React: The frontend is built using React for its efficient component-based architecture and ability to manage state across the app.
    State management: React useState is used to manage the state of the contact list, search query, and form input.
    Form submission: The form to add a contact uses the onSubmit event, preventing the default form behavior to handle adding a contact via API.
    Search functionality: Search functionality is implemented by filtering the contact list based on the name or email, ensuring it’s case-insensitive for user convenience.
  2. Backend
    Node.js: The backend is built with Node.js, using the Express framework to handle HTTP requests.
     API: The backend exposes simple RESTful API endpoints:
      - GET /contacts: Fetches the list of all contacts.
      - POST /contacts: Adds a new contact.
      - GET /contacts/search: Searches for contacts by name or email.
      - DELETE /contacts/:emailid: Deletes a contact by EmailID.
        
  File-based contact storage: In this project, contacts are stored in-memory for simplicity. In a real-world scenario, a database like MongoDB or PostgreSQL would be used to persist data.

### Trade-offs & Design Decisions:
  - In-memory storage: For simplicity, contacts are stored in memory on the backend. This means the data will be lost when the server restarts. For a real-world application, a database should be integrated for persistent storage.
  - Search performance: The search functionality performs a basic filter() on the entire contact list in memory, which is fine for small datasets. However, for larger datasets, more efficient search algorithms such as partial search using Trie, etc.

