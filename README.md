# CourseSellingBackend

A robust backend service for a course selling platform, built with Node.js, Express, and MongoDB. This platform enables secure user and admin management, course creation, and purchase workflows.

## 🚀 Features

- **User Authentication & Registration:** Secure JWT-based authentication with password hashing.
- **Admin Authentication & Management:** Separate authentication and course management routes for admins.
- **Course Management:** Admins can create, update, and list courses.
- **Course Purchase & History:** Users can purchase courses and view their purchase history.
- **View Courses:** Users can view all available courses and their purchased courses.
- **Route Protection:** Middleware-based JWT protection for both user and admin routes.
- **RESTful API Design:** Organized endpoints for user and admin operations.

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- bcrypt (Password Hashing)
- dotenv (Environment Variables)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Rahulchaudharyji2/CourseSellingBackend.git
    cd CourseSellingBackend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add:
    ```
    port=5000
    mongoUrl=mongodb://localhost:27017/courseSelling
    jwtSecret=your_admin_jwt_secret
    userJwtSecret=your_user_jwt_secret
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

    Server runs at `http://localhost:5000`

## 📝 API Endpoints

### User Routes (`/v1`)
- `POST /userLogin` — Register a new user
- `POST /userSignup` — User sign in
- `POST /userPurchase` — Purchase a course (auth required)
- `GET /userSeePurchaseCourse` — Get purchased courses (auth required)
- `GET /userAllCourses` — Get all available courses

### Admin Routes (`/v1`)
- `POST /adminLogin` — Register a new admin
- `POST /adminSignUp` — Admin sign in
- `POST /adminCreateCourse` — Create a course (auth required)
- `PUT /adminUpdateCourse` — Update a course (auth required)

## 🔒 Authentication

- JWT tokens are required for protected routes. Pass your token in the request headers as `token`.

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome! Please [open an issue](https://github.com/Rahulchaudharyji2/CourseSellingBackend/issues) or submit a pull request.

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

**Connect with me:**  
[LinkedIn](https://www.linkedin.com/in/rahulchaudharyji2/) | [GitHub](https://github.com/Rahulchaudharyji2)
