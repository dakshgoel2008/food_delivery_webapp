# Food Delivery App (MERN Stack)

## 🚀 Project Overview

This project is a full-stack food delivery application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse restaurants, add food items to the cart, place orders, and track their delivery status.

## 🔑 Current Features

User Authentication: Secure authentication using JWT tokens.

Role-Based Access Control: Separate functionalities for users, restaurants.

Menu Management: Restaurants can add, edit, or remove menu and cuisine items

Still Under progress 😊

## 📌 Prerequisites

Ensure you have the following installed:

-   Node.js (LTS version recommended)

-   MongoDB (Locally or using MongoDB Atlas)

-   Git

## 🛠️ Setup Guide

#### 1️⃣ Fork & Clone the Repository

Fork this repository to your GitHub account.

Clone it to your local machine:

```bash
git clone https://github.com/your-username/food-delivery-app.git
```

Navigate into the project directory:

```bash
cd food-delivery-app
```

#### 2️⃣ Start MongoDB

Make sure MongoDB is running. If using a local instance, start MongoDB with:

```bash
mongod --dbpath=data
```

#### 3️⃣ Backend Setup (Express + MongoDB)

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm init -y
```

```bash
npm i express
```

Start the backend server:

```bash
npm start
```

#### 4️⃣ Frontend Setup (React.js)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend/src
```

Install dependencies:

```bash
npm init -y
```

Start the frontend server:

```bash
npm start
```

#### 5️⃣ Open the App

Once both servers are running:

Open http://localhost:3000/ to access the frontend. {Will start once react started to work}

The backend API will be available at http://localhost:4444/ {By Default} -> (or the port defined in your backend .env).
