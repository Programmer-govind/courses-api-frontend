# 🎨 Courses Frontend

Welcome to the **Courses Frontend** – a modern React app for managing courses and their instances, designed for the IIT Bombay ASC Internship Assignment.

---

## ✨ Features

- **Beautiful, responsive UI** with React & Vite
- **Course and Instance Management**
- **Live API integration** with backend
- **Validation & error handling**
- **Dockerized** for easy deployment
- **Production-ready** with DockerHub & Compose support

---

## 🖥️ Screenshots

![Dashboard](https://github.com/user-attachments/assets/d97904fa-2f72-4ad5-90c4-752dba100d3d)


---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **JavaScript (ES6+)**
- **Docker & Docker Compose**

---

## 🚀 Quick Start

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd courses-frontend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run Locally
```sh
npm run dev
```
- App runs at: `http://localhost:3000`

---

## 🐳 Docker Usage

### Build & Push Image
```sh
docker build -t <your-dockerhub-username>/courses-frontend:latest .
docker push <your-dockerhub-username>/courses-frontend:latest
```

### Run with Docker Compose

**Recommended:** Use the root `docker-compose.yaml` to start the entire stack (backend, frontend, and database):

```sh
docker-compose up --build
```

---

## 📝 Assignment Justification

- **All UI features** and **validation** implemented as per requirements
- **API integration** with backend
- **Dockerized** for easy deployment and grading
- **Documentation** provided for quick setup and usage

---

## 🤝 Author & Credits

- **Author:** Gautam Govind
- **For:** IIT Bombay ASC Internship Assignment 2025

---

## 📄 License

MIT License
