# 🚀 Secure Blog Platform (MERN Stack)

A full-stack blog application built using the **MERN stack** with secure authentication, protected routes, and a modern responsive UI.

This project demonstrates **production-style backend architecture, JWT security, password hashing, CRUD operations, and clean frontend design**.

---

## ✨ Core Features

### 🌍 Public Blog Feed
- View all blog posts without login
- Read posts, likes count, and comments
- Pagination for faster browsing

> Anyone can browse posts publicly

---

### 🔐 Authentication & Security
- User Registration & Login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes
- Logout with token removal
- Environment variables for secrets

---

### 📝 Blog Management (Login Required)
- Create new blog posts
- Edit your own posts only
- Delete your own posts only
- Personal dashboard showing only your blogs

---

### ❤️ Engagement System (Login Required)
- Like / Unlike posts
- Add comments to posts
- Multiple comments per post

> Public users can view likes/comments but cannot interact

---

### ⚡ Performance & UX
- Pagination
- Toast notifications
- Clean modern UI
- Mobile-first responsive design

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

---

## 📁 Project Structure

```
BlogApplication/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── main.jsx
│   │   └── App.jsx
│   │
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/saqlain-27/mern-blog-application.git
cd BlogApplication
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
node server.js
```

Create **server/.env**

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```

Create **client/.env**

```
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 Deployment

- Backend → Render  
- Frontend → Vercel  
- Database → MongoDB Atlas  

---

## 🔐 Access Rules

### Public (No Login Required)
- View posts
- Read likes count
- Read comments
- Browse paginated blog feed

### Login Required
- Create posts
- Edit posts
- Delete posts
- Like / Unlike posts
- Comment on posts

---

## 🔒 Security Practices

- Password hashing using bcrypt
- JWT authentication
- Protected routes with middleware
- Ownership validation (users manage only their own posts)
- Environment variables for secrets
- No sensitive credentials committed to GitHub

---

## 📱 Responsiveness

- Mobile-first layout
- Tablet & desktop support
- Consistent spacing and typography using Tailwind CSS

---

## 📡 API Endpoints

### 🔐 Authentication
POST   /api/auth/register      Register new user  
POST   /api/auth/login         Login user and receive JWT token  

---

### 🌍 Public Blog Feed
GET    /api/blogs?page=1&limit=6   Get paginated public blog feed  

---

### 📝 Blogs (Protected – Login Required)
GET    /api/blogs/me?page=1&limit=6   Get logged-in user's blogs (dashboard)  
GET    /api/blogs/:id                Get single blog (owner only, for edit)  
POST   /api/blogs                    Create new blog  
PATCH  /api/blogs/:id                Update blog (owner only)  
DELETE /api/blogs/:id                Delete blog (owner only)  

---

### ❤️ Likes (Protected – Login Required)
POST   /api/blogs/:id/like     Toggle like / unlike a blog  

---

### 💬 Comments (Protected – Login Required)
POST   /api/blogs/:id/comment  Add comment to blog  

---

### 🔒 Notes
- JWT token required for all protected routes  
- Only owners can edit or delete their posts  
- Public users can view posts, likes, and comments without login  
- Pagination supported using `page` and `limit` query parameters  

---

## 📌 Future Improvements
- Image upload support
- Edit/Delete comments
- Infinite scroll
- Notifications
- Unit testing

---

## 🎯 Resume Highlights

This project demonstrates:

- Full MERN stack development
- Secure authentication system
- RESTful API design
- CRUD operations with ownership control
- Likes, comments, and pagination
- Professional folder structure
- Deployment-ready production setup

---

## 👨‍💻 Author

Muhammed Saqlain A
