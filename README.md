📝 Blog Portal Application

A full-stack blogging platform where users can share their journeys, experiences, and ideas through blogs. The application allows users to create accounts, write and manage blog posts, upload images, and interact with content through likes and comments.

🌟 Features
🔐 User Authentication
Signup & Login
Forgot password using OTP verification

✍️ Blog Management
Create, edit, and delete blog posts
Categorize blogs based on interests or journeys

💬 User Interaction
Like / Unlike blog posts
Comment on posts

🖼️ Image Upload
Upload blog images using MongoDB GridFS

📱 Responsive UI
Works smoothly on desktop and mobile devices

🛠️ Tech Stack

Frontend
React
Redux
React Router
Material-UI
Axios
React Toastify

Backend
Node.js
Express.js
MongoDB
Mongoose
Multer + GridFS


📂 Project Structure
BlogPortal-main
├── client/                     # React Frontend
│   └── src/
│       ├── assets/             # Images & static assets
│       ├── components/         # UI components
│       │   ├── about/
│       │   ├── authent/        # Login, Signup, Forgot Password
│       │   ├── banner/
│       │   ├── contact/
│       │   ├── create/         # Create & Update blog posts
│       │   ├── header/
│       │   ├── Home/
│       │   └── postDetails/    # Blog details & comments
│       ├── redux/              # Redux store, reducers & slices
│       ├── service/            # API configuration
│       ├── App.js
│       └── index.js
│
├── server/                     # Node.js + Express Backend
│   ├── controllers/            # Business logic
│   │   ├── user.controller.js
│   │   ├── posts.controller.js
│   │   ├── comments.controller.js
│   │   └── image.controller.js
│   ├── routes/                 # API routes
│   │   ├── user.routes.js
│   │   ├── posts.routes.js
│   │   ├── comments.routes.js
│   │   └── image.routes.js
│   ├── model/                  # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── posts.model.js
│   │   ├── comment.model.js
│   │   └── userOtp.model.js
│   ├── utils/                  # GridFS & upload utilities
│   │   └── upload.utils.js
│   ├── db/                     # Database & JWT config
│   │   ├── db.js
│   │   └── jwt.config.js
│   └── server.js               # Server entry point
│
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


✅ Prerequisites
Node.js v18.x
MongoDB (local)
npm or yarn

⚙️ Environment Setup
1️⃣ Backend .env
Create the file:
📄 server/.env

PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/blogportal
SECRET=mySessionSecret123
JWT_SECRET=myJwtSecret123

BASE_URL=http://localhost:3000
BACKEND_URL=http://localhost:5001

2️⃣ Frontend API Configuration

📄 client/src/service/api.js
export const BASE_URL = "http://localhost:5001";

📦 Installation
Backend
cd server
npm install

Frontend
cd client
npm install

▶️ Running the Application
Step 1: Start MongoDB
mongod --dbpath ~/mongo-data

Step 2: Start Backend
cd server
npm start


Expected output:
server is running successfully at 5001
Successfully Connected to Database!!

Step 3: Start Frontend
cd client
npm start


Frontend runs at:
http://localhost:3000

🔗 API Endpoints
👤 User Routes
POST /user/signup
POST /user/login
POST /user/sendotppassword
POST /user/otpverify
POST /user/newpassword

📝 Blog Routes
POST /createPost
PUT /updatePost/:id
DELETE /deletePost/:id
GET /getPostsById/:id
POST /posts/toggleLike/:id



💬 Comments
POST /AddNewComment
🖼️ Image Upload
POST /image/upload
GET /image/:filename


🧠 Purpose of the Project

This Blog Portal was created to provide a platform where users can freely express their journeys, experiences, and ideas through meaningful blog posts. It encourages storytelling, knowledge sharing, and community interaction in a simple and user-friendly environment.


👨‍💻 Author

Shreyank Tawade
Full-Stack Developer | Blog Portal Project
