# Node Shop

A full-stack e-commerce application with React frontend and Node.js backend.

## Features
- Product management
- Modern UI/UX design
- RESTful API

## Technologies
- Frontend: React, Vite
- Backend: Node.js, Express
- Deployment: Netlify (frontend), Railway (backend)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/node-shop.git
cd node-shop
```

2. Install dependencies for both client and server:
```bash
cd client && npm install
cd ../server && npm install
```

## Running the Project

### Option 1: Separate Terminals
1. Start the development server:
```bash
# In one terminal
cd server && npm run dev

# In another terminal
cd client && npm run dev
```

2. Access the application at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Option 2: Concurrent Execution (Recommended)
1. Install concurrently:
```bash
# Install globally
npm install -g concurrently

# OR install locally
npm install concurrently --save-dev
```

2. Run both client and server with one command:
```bash
npm run dev
```

This will start both the client and server simultaneously.

## Deployment

The application is deployed at:
- Frontend: [https://newnodeshop.netlify.app/](https://newnodeshop.netlify.app/)
- Backend: [node-shop-production-f5d5.up.railway.app](node-shop-production-f5d5.up.railway.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.