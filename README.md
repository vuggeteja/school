# School Management System

A complete MERN stack school management system with multi-tenant architecture, role-based access control, and modern Material-UI interface.

## Features

- **Multi-tenant Architecture**: Separate data isolation per school
- **Role-based Access Control**:
  - Super Admin: Manage all schools and users
  - School Admin: Manage their school's data
  - Parent: View their children's information
- **Modules**:
  - Student Management
  - Attendance Tracking
  - Fee Management
  - Homework Assignment
  - Marks/Grades Recording
  - School Administration

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Material-UI, Axios
- **Authentication**: JWT, bcrypt
- **Database**: MongoDB with multi-tenant data isolation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB URI
   echo "MONGO_URI=your_mongodb_connection_string" > .env
   echo "JWT_SECRET=your_super_secret_jwt_key" >> .env
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Default Login Credentials

After running the seed script, you can login with:

- **Super Admin**:
  - Email: `admin@school.com`
  - Password: `admin123`

- **School Admin** (for School A):
  - Email: `schooladmin@schoola.com`
  - Password: `admin123`

- **Parent** (John Doe's parent):
  - Email: `parent@example.com`
  - Password: `parent123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (admin only)

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Fees
- `GET /api/fees` - Get fee records
- `POST /api/fees` - Create fee
- `PUT /api/fees/:id` - Update fee status

### Homework
- `GET /api/homework` - Get homework assignments
- `POST /api/homework` - Create homework

### Marks
- `GET /api/marks` - Get marks records
- `POST /api/marks` - Add marks

### Schools (Super Admin only)
- `GET /api/schools` - Get all schools
- `POST /api/schools` - Create school

## Database Seeding

To populate the database with test data:

```bash
cd backend
node seed.js
```

This will create:
- 1 Super Admin
- 2 Schools with admins
- Sample students, parents, attendance, fees, homework, and marks data

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

3. Open http://localhost:3000 in your browser
4. Login with the provided credentials
5. Navigate through different modules based on your role

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS enabled
- Input validation and sanitization

## Project Structure

```
school-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── School.js
│   │   ├── Student.js
│   │   ├── Attendance.js
│   │   ├── Fee.js
│   │   ├── Homework.js
│   │   └── Marks.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── attendance.js
│   │   ├── fees.js
│   │   ├── homework.js
│   │   ├── marks.js
│   │   └── schools.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── seed.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── pages/
    │       ├── Login.js
    │       ├── Dashboard.js
    │       ├── Students.js
    │       ├── Attendance.js
    │       ├── Fees.js
    │       ├── Homework.js
    │       ├── Marks.js
    │       └── Schools.js
    └── package.json
```

## Usage

1. Start the backend server (`npm start` in backend directory)
2. Start the frontend server (`npm start` in frontend directory)
3. Open http://localhost:3000 in your browser
4. Login with the provided credentials
5. Navigate through different modules based on your role

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser to `http://localhost:3000`

## Default Login

- **Super Admin**: Create one by registering with role "superadmin"
- **School Admin**: Created by super admin
- **Parent**: Created by school admin

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/parents` - Get parents (authenticated)

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Fees
- `GET /api/fees` - Get fee records
- `POST /api/fees` - Add fee
- `PUT /api/fees/:id` - Update fee status

### Homework
- `GET /api/homework` - Get homework
- `POST /api/homework` - Add homework
- `PUT /api/homework/:id` - Update homework
- `DELETE /api/homework/:id` - Delete homework

### Marks
- `GET /api/marks` - Get marks
- `POST /api/marks` - Add marks
- `PUT /api/marks/:id` - Update marks

### Schools (Super Admin)
- `GET /api/schools` - Get all schools
- `POST /api/schools` - Create new school

## Project Structure

```
school-management/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── School.js
│   │   ├── Student.js
│   │   ├── Attendance.js
│   │   ├── Fee.js
│   │   ├── Homework.js
│   │   └── Marks.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── attendance.js
│   │   ├── fees.js
│   │   ├── homework.js
│   │   ├── marks.js
│   │   └── schools.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── public/
    ├── src/
    │   ├── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── pages/
    │       ├── Login.js
    │       ├── Dashboard.js
    │       ├── Students.js
    │       ├── Attendance.js
    │       ├── Fees.js
    │       ├── Homework.js
    │       ├── Marks.js
    │       └── Schools.js
    ├── package.json
    └── README.md
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Data isolation by schoolId
- Secure API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.