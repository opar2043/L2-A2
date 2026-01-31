# 🚗 Vehicle Rental System (Backend API)

A modular **Vehicle Rental System API** built with **Node.js**, **TypeScript**, and **SQL**, featuring role-based authentication, vehicle booking management, and secure admin/customer access.

## 🔗 Live URL
👉 https://a2-l2.vercel.app/

## 📂 GitHub Repository
👉 https://github.com/opar2043/L2-A2.git

---

## 📌 Project Overview

This project provides a complete backend solution for managing a vehicle rental platform.  
It follows a **modular architecture** and supports **Admin** and **Customer** roles with secure JWT-based authentication.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin & Customer)
- Secure password hashing with bcrypt
- Signup & Signin APIs

### 🚘 Vehicle Management
- Add, update, delete, and view vehicles
- Track vehicle availability status
- Prevent deletion if active bookings exist

### 👤 User Management
- Admin can manage all users
- Customers can update their own profiles
- Role update support (Admin only)

### 📅 Booking Management
- Create vehicle bookings with date validation
- Automatic cost calculation (daily rate × duration)
- Prevent double booking
- Role-based booking visibility
- Automatic vehicle status update on booking

---

## 🛠 Technology Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** Neon DB (PostgreSQL)
- **ORM/Query:** SQL
- **Authentication:** JWT
- **Security:** bcryptjs
- **Architecture:** Modular Pattern
- **Deployment:** Vercel

---

## 🔑 Admin Login Credentials (Demo)

```json
{
  "email": "opar3@gmail.com",
  "password": "admin123"
}
