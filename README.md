


# DiagnoVet

## Overview
**DiagnoVet** is a veterinary healthcare tool built using the **MERN stack (MongoDB, Express.js, React, Node.js)** to assist veterinarians in diagnosing diseases based on symptoms and recommending appropriate medication dosages. The application is deployed on **AWS EC2** with **CI/CD** integration and **Docker** to ensure scalability and reduced infrastructure overhead.

## Features
- **Symptom-Based Diagnosis:** Allows veterinarians to input symptoms and receive possible disease diagnoses.
- **Dosage Recommendation:** Provides accurate medication dosages based on animal type, weight, and condition.
- **AWS EC2 Deployment:** Ensures high availability and scalability of the application.
- **CI/CD Pipeline:** Automated deployment using GitHub Actions for seamless updates.
- **Dockerized Architecture:** Reduces infrastructure overhead by 35% and enhances portability.
- **MongoDB Database:** Stores veterinary knowledge base and user data securely.

## Tech Stack
- **Frontend:** React, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** AWS EC2, Docker, GitHub Actions (CI/CD)

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/45851d16-79f8-44d4-91e4-c52e4b7c52b0" />
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/51c3ca2f-1c8f-404d-b2e8-cf9941ad477f" />
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/40de4cf8-61ba-4b97-ba6e-4e3b6f340ea7" />
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/6f79646f-0c3d-40cc-9597-05190ceac017" />
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/a755f641-992e-4fc7-a502-fac9133a72ee" />
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/273a549c-ab38-4a0e-83e9-b342bb839b4d" />
</div>



## Installation & Setup
1. **Clone the Repository**  
   ```sh
   git clone https://github.com/yourusername/diagnovet.git
   cd diagnovet
   ```
2. **Install Dependencies**  
   ```sh
   npm install  # For backend
   cd client && npm install  # For frontend
   ```
3. **Start the Backend Server**  
   ```sh
   npm run server
   ```
4. **Start the Frontend**  
   ```sh
   cd client
   npm start
   ```
5. **Run with Docker**  
   ```sh
   docker-compose up --build
   ```

## Deployment
The project is deployed on **AWS EC2** with a fully automated **CI/CD pipeline** using **GitHub Actions**. Updates are pushed to the live server upon merging new changes into the main branch.

## API Endpoints

The backend provides the following RESTful API endpoints:

### Diagnosis Routes
- **POST `/diagnosis/create`** - Creates a new diagnosis entry.
- **GET `/diagnosis/fetchAll`** - Retrieves all diagnosis records.
- **GET `/diagnosis/fetch/:id`** - Fetches a specific diagnosis by ID.
- **PUT `/diagnosis/update/:id`** - Updates an existing diagnosis record.
- **DELETE `/diagnosis/delete/:id`** - Deletes a diagnosis record.

### Drug Routes
- **POST `/drug/create`** - Adds a new drug to the system.
- **GET `/drug/fetchAll`** - Retrieves all available drugs.
- **GET `/drug/fetch/:id`** - Fetches details of a specific drug by ID.
- **PUT `/drug/update/:id`** - Updates a drug's information.
- **DELETE `/drug/delete/:id`** - Removes a drug from the system.

### User Routes
- **POST `/user/register`** - Registers a new veterinarian.
- **POST `/user/login`** - Authenticates a user and returns an access token.
- **GET `/user/profile/:id`** - Fetches a veterinarian's profile.
- **PUT `/user/update/:id`** - Updates user profile details.
- **DELETE `/user/delete/:id`** - Removes a user from the system.

## Future Enhancements
- Implement AI-powered diagnosis for better accuracy.
- Add multi-language support for global reach.
- Mobile-friendly UI for better accessibility.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the **MIT License**.

## Contact
For queries or collaborations, reach out at **your.email@example.com**.

