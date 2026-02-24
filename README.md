# Lead Management System

A full-stack application to manage business leads, featuring a RESTful API built with Spring Boot and a dynamic frontend developed with Vanilla JavaScript.

## Tech Stack

### Backend
- **Java 25 / Spring Boot 4.0.3**
- **Spring Data JPA**: For database ORM and persistence.
- **H2 Database**: In-memory relational database for development.
- **Jakarta Validation**: Server-side constraints for data integrity.

### Frontend
- **Vanilla JavaScript (ES6+)**: Handles asynchronous API calls and DOM manipulation.
- **CSS3**: Custom styles for a clean, responsive data dashboard.
- **HTML5**: Semantic structure and native form validation.

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/leads` | Retrieves all registered leads. |
| `POST` | `/api/leads` | Registers a new lead with validation (Name, Email, Phone). |
| `PUT` | `/api/leads/{id}` | Updates the status of an existing lead. |
| `DELETE` | `/api/leads/{id}` | Removes a lead record from the database. |

## Core Architecture

This project follows a **Layered Architecture** pattern:

1.  **Model Layer**: Defines the `Lead` entity with validation annotations (`@Email`, `@NotBlank`, etc.).
2.  **Repository Layer**: Uses `JpaRepository` to handle CRUD operations without manual SQL.
3.  **Controller Layer**: Implements REST controllers with `ResponseEntity` to manage HTTP status codes.
4.  **Service/Frontend Layer**: A modular JavaScript implementation using the `fetch` API to interact with the backend asynchronously.

## How to Run

1. **Backend**:
   - Open the project in your IDE.
   - Run `LeadmanagerApplication.java`.
   - The server will start on `http://localhost:8080`.

2. **Frontend**:
   - Open `index.html` using a local server (e.g., Live Server).
   - Ensure the backend is running to allow successful API requests.

3. **Database**:
   - Access the H2 console at `http://localhost:8080/h2-console` to view the `leads` table.