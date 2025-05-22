# 🌿 The Gardener's Hub

🔗 **Live Site URL:** [https://the-gardener-s-hub-client.vercel.app/](https://the-gardener-s-hub-client.vercel.app/)

---

## 📖 Project Description

**The Gardener’s Hub** is a full-stack gardening community and resource hub where users can explore and share plant care tips, connect with fellow gardeners, post and browse gardening events, and join discussions on various gardening topics including composting, hydroponics, vertical gardening, and more. This platform supports user authentication, CRUD operations for gardening tips, private routing, and dynamic data rendering.

---

## ✨ Features

- 🔐 **User Authentication**: Secure login/registration using Firebase, with email-password and Google auth support.
- 🌱 **CRUD Functionalities**: Authenticated users can add, update, delete, and view gardening tips.
- 📊 **Tips Dashboard**: Public tips are listed in a table with filterable difficulty levels and detailed view access.
- 🌟 **Home Page Highlights**:
  - Dynamic slider showcasing gardening events.
  - Featured active gardeners section.
  - Top trending tips with like functionality.
- 👩‍🌾 **Explore Gardeners**: View local gardener profiles with experience and tip contributions.
- 🌘 **Dark/Light Mode**: Theme toggle switch for personalized viewing experience.
- 🔎 **Filtering**: Browse tips by difficulty (Easy, Medium, Hard).
- ❤️ **Like Tips**: Each tip can be liked and the like count is updated in real-time in the DB.
- 💬 **Private Routes**: Tips sharing, personal tips management, and tip details are protected routes.
- 🛠️ **Responsive Design**: Fully responsive across mobile, desktop, and tablet devices.
- 🎨 **UI Enhancements**: Smooth animations using **React Awesome Reveal** .

---

---

## 🛠️ Technologies Used

### 🧩 Frontend (Client)

- **React.js** – JavaScript library for building user interfaces.
- **React Router** – Handles dynamic routing in the SPA.
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- **DaisyUI** – Tailwind CSS components for enhanced UI design.
- **Firebase Authentication** – Secure and scalable user authentication.
- **Axios** – Promise-based HTTP client for API communication.
- **SweetAlert2** – Customizable popup boxes for better UX.
- **React Awesome Reveal** – Animation components using Framer Motion and Intersection Observer.

### ⚙️ Backend (Server)

- **Node.js** – JavaScript runtime environment for server-side development.
- **Express.js** – Minimal and flexible web application framework for Node.js.
- **MongoDB** – NoSQL database for efficient and scalable data storage.
- **Cors** – Middleware for enabling Cross-Origin Resource Sharing.
- **Dotenv** – Loads environment variables from `.env` files into `process.env`.

---

## 🔒 Environment Variables

Stored securely in a `.env` file (not pushed to GitHub):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

MONGODB_URI=

```

---

## ✅ Functional Pages

- Home (`/`)
- Sign In (`/signin`)
- Sign Up (`/signup`)
- Explore Gardeners (`/explore-gardeners`)
- Browse Tips (`/browse-tips`)
- Tip Details (Private, `/tips/:id`)
- Share a Garden Tip (Private, `/share-tip`)
- My Tips (Private, `/my-tips`)
- Update Tip (Private, `/update-tip/:id`)
- 404 Not Found (Handled by `ErrorPage`)

---

## 🚀 Hosting

- **Client**: Vercel → [https://the-gardener-s-hub-client.vercel.app/](https://the-gardener-s-hub-client.vercel.app/)
- **Server**: Vercel → [https://the-gardener-s-hub-server.vercel.app/](https://the-gardener-s-hub-server.vercel.app/)

---

## 📸 Screenshots

### 🏡 Home Page

![Home Page](https://i.ibb.co/8gBbz4Hr/Whats-App-Image-2025-05-23-at-01-12-54-3b9285f8.jpg)

---

## 🧑‍💻 Developed By

**Mst. Aysa Siddika Meem**
