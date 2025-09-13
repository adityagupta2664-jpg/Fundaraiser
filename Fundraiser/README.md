# Startup Funding Portal - Backend

A complete backend API for the Startup Funding Portal that connects startups with government schemes and private investors.

## Features

- **Government Schemes API**: Browse and search funding schemes with filters
- **Private Investors API**: Discover VCs, angels, and accelerators
- **Application System**: Quick and full application submissions
- **Contact System**: Handle contact form submissions
- **User Authentication**: Signup and login functionality
- **Search & Filtering**: Advanced search across schemes and investors

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for frontend integration

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/startup-funding
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if MongoDB is installed as service)
net start MongoDB

# Or start manually
mongod
```

### 4. Seed Database (Optional)
Populate with sample data:
```bash
node seedData.js
```

### 5. Start Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Schemes
- `GET /api/schemes` - Get all schemes (with filters: state, stage, sector, q)
- `GET /api/schemes/:id` - Get single scheme

### Investors
- `GET /api/investors` - Get all investors (with filters: type, stage, sector, q, sort)
- `GET /api/investors/:id` - Get single investor

### Applications
- `POST /api/applications/quick` - Submit quick application
- `POST /api/applications/full` - Submit full application
- `GET /api/applications` - Get all applications (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Health Check
- `GET /api/health` - Server health status

## Database Models

### Scheme
- Government funding schemes with eligibility, links, and filtering options

### Investor
- Private investors, VCs, angels with investment criteria

### Application
- Startup applications (quick and full) with matching logic

### Contact
- Contact form submissions with status tracking

### User
- User accounts with authentication and roles

## Frontend Integration

The backend is designed to work with the provided HTML frontend. Make sure:

1. Frontend `API_BASE_URL` points to `http://localhost:5000/api`
2. CORS is enabled for your frontend domain
3. All API endpoints match the frontend expectations

## Sample Data

The `seedData.js` script includes:
- 6 government schemes (central and state-level)
- 6 private investors (VCs, angels, incubators)

Run `node seedData.js` to populate your database with this sample data.

## Development Notes

- All responses follow a consistent format: `{ status, message?, data? }`
- Text search is enabled on schemes and investors
- Password hashing is automatic on user creation
- JWT tokens expire in 7 days
- Input validation on all POST endpoints