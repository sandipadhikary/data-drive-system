# 📂 Data Drive System

A full-stack web application for managing files and folders online, similar to Google Drive. Users can register, log in, create folders, upload files, and organize data with nested folders. Built with **React, Node.js, Express, MongoDB**, and **Vanilla JS/CSS frontend**.

---

## 🖥️ Features

- **User Authentication**
  - Registration & Login with JWT-based authentication
  - Secure password hashing with bcrypt

- **Folder Management**
  - Create, delete, and organize folders
  - Nested folders to any depth
  - Delete a folder automatically deletes all files inside

- **File Management**
  - Upload files to selected folders only
  - Delete files individually
  - Download or preview files directly from the dashboard

- **Dashboard**
  - Folder-based file filtering
  - Dynamic folder selection for file uploads
  - Logout functionality
  - Responsive design with neon/animated UI

- **Tech Stack**
  - **Backend:** Node.js, Express, MongoDB, Mongoose
  - **Frontend:** HTML, CSS (neon effects & animations), JavaScript
  - **File Uploads:** Multer middleware

---

## 🚀 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/data-drive-system.git
cd data-drive-system
Install backend dependencies

bash
Copy code
cd backend
npm install
Create .env file

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the backend server

bash
Copy code
npm run dev
Open frontend

Open frontend/index.html in your browser or serve with a live server.

🗂️ Folder Structure
pgsql
Copy code
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── folderController.js
│   │   └── fileController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── folderModel.js
│   │   └── fileModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── folderRoutes.js
│   │   └── fileRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── app.js
│   └── server.js
├── uploads/
└── package.json

frontend/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── css/
│   ├── style.css
│   └── dashboard.css
└── js/
    └── main.js
🎨 UI/UX
Neon glowing buttons & inputs

Smooth hover transitions

Responsive layout

Files & folders display similar to Google Drive

⚙️ API Endpoints
Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Login and get JWT token
POST	/api/folders	Create a new folder
GET	/api/folders	Get all folders for user
DELETE	/api/folders/:id	Delete folder and files inside
POST	/api/files	Upload file to a folder
GET	/api/files	Get all files for user or folder
DELETE	/api/files/:id	Delete a file

🔮 Future Enhancements
Drag-and-drop file uploads

File search & filtering

Share folders/files with other users

User profile and settings

Version control for files

Real-time notifications & activity log