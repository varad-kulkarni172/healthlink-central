# HealthLink Central

HealthLink Central is a comprehensive platform designed to streamline healthcare management by connecting patients, doctors, and healthcare facilities. It offers a user-friendly interface for appointment scheduling, medical record management, and communication between healthcare providers and patients.

## Features

- **Appointment Scheduling:** Easily book and manage appointments with healthcare professionals.
- **Medical Records Management:** Securely store and access patient medical histories.
- **Communication Portal:** Facilitate seamless communication between patients and healthcare providers.
- **User Authentication:** Ensure data privacy with robust authentication mechanisms.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Installation and Setup

Follow these steps to set up and run HealthLink Central on your local machine:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/varad-kulkarni172/healthlink-central.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd healthlink-central
   ```

3. **Install Backend Dependencies:**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**

   - Create a `.env` file in the root directory.
   - Add the following environment variables:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. **Start the Backend Server:**

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`.

6. **Navigate to the Frontend Directory:**

   ```bash
   cd client
   ```

7. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

8. **Start the Frontend Server:**

   ```bash
   npm start
   ```

   The frontend application will run on `http://localhost:3000`.

## Usage

1. **Access the Application:**

   - Open your browser and navigate to `http://localhost:3000`.

2. **Register an Account:**

   - Sign up as a patient or healthcare provider.

3. **Explore Features:**

   - Schedule appointments, manage medical records, and communicate with healthcare professionals.

## Contributing

We welcome contributions to enhance HealthLink Central. To contribute:

1. **Fork the Repository.**
2. **Create a New Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes and Commit Them:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
