# 👁️ Netraya 💙

A **full-stack Eye Clinic Management System** built with **React.js, Node.js, Express.js, and MySQL**.

Netraya is designed to simplify eye clinic operations by connecting patients, doctors, and staff through a centralized digital system. Patients can register, manage their profiles, view doctors and services, while doctors can manage their daily patient queue and view patient information. Staff can manage clinic operations and patient-related activities.

---

# ✨ Features

## 👤 Patient Features

- Patient Registration & Login
- Patient Dashboard
- Manage Patient Profile
- View Eye Clinic Services
- View Doctors
- View Doctor Profiles
- View Today's Token Status
- Search Patient Information
- Patient Logout

## 👨‍⚕️ Doctor Features

- Secure Doctor Login
- Doctor Dashboard
- View Today's Patient Queue
- View Patient Profile
- Manage Token Status
- View Doctor Profile
- Update Doctor Profile
- Track Patient Consultation Status

## 👩‍💼 Staff Features

- Secure Staff Login
- Staff Dashboard
- Patient Management
- Patient Search
- Token Management
- View Patient Information
- Manage Clinic Operations

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Bootstrap 5
- Axios
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt
- dotenv
- Sequelize

## Database

- MySQL

---

# 📂 Project Structure & Workflow

```text
Netraya
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   ├── layouts
│   └── services
│
├── server
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── uploads
│   └── server.js
│
├── screenshots
│   ├── doctorDashboard.png
│   ├── doctorProfile.png
│   ├── homepage.png
│   ├── loginpage.png
│   ├── ourdoctors.png
│   ├── patientDashboard.png
│   ├── registerpage.png
│   ├── searchpatient.png
│   ├── services.png
│   ├── staffDashboard.png
│   └── todaysqueue.png
│
├── README.md
└── .gitignore

# 🔄 Application Workflow

```text
                                 👁️ Netraya
                                     │
             ┌───────────────────────┼───────────────────────┐
             │                       │                       │
             ▼                       ▼                       ▼
        👤 Patient               👨‍⚕️ Doctor               👩‍💼 Staff
             │                       │                       │
             ▼                       ▼                       ▼
      Register / Login          Doctor Login            Staff Login
             │                       │                       │
             ▼                       ▼                       ▼
     Patient Dashboard       Doctor Dashboard        Staff Dashboard
             │                       │                       │
       ┌─────┼─────┐                 ▼                       ▼
       │     │     │            Today's Queue      Patient Management
       ▼     ▼     ▼                 │                       │
   Services Doctors Profile          ▼                       ▼
       │     │     │            Patient Profile        Search Patient
       │     │     │                 │                       │
       └─────┴─────┴─────────────────┴───────────────────────┘
                                     │
                                     ▼
                              🗄️ MySQL Database
```

# 📸 Screenshots & UI Previews

## 🏠 Home Page

![Netraya Home Page](./screenshots/homepage.png)

---

## 🔐 Login Page

![Netraya Login Page](./screenshots/loginpage.png)

---

## 📝 Registration Page

![Netraya Registration Page](./screenshots/registerpage.png)

---

## 👤 Patient Dashboard

![Netraya Patient Dashboard](./screenshots/patientDashboard.png)

---

## 👨‍⚕️ Doctor Dashboard

![Netraya Doctor Dashboard](./screenshots/doctorDashboard.png)

---

## 👨‍⚕️ Doctor Profile

![Netraya Doctor Profile](./screenshots/doctorProfile.png)

---

## 👩‍💼 Staff Dashboard

![Netraya Staff Dashboard](./screenshots/staffDashboard.png)

---

## 👨‍⚕️ Our Doctors

![Netraya Our Doctors](./screenshots/ourdoctors.png)

---

## 👁️ Eye Clinic Services

![Netraya Services](./screenshots/services.png)

---

## 📋 Today's Patient Queue

![Netraya Today's Queue](./screenshots/todaysqueue.png)

---

## 🔎 Search Patient

![Netraya Search Patient](./screenshots/searchpatient.png)

---

# ⚙️ Installation & Running Locally

Follow these steps to run **Netraya** locally on your system.

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MySQL
- Git
- VS Code

---

## 📥 Clone Repository

```bash
git clone https://github.com/Rizwana200/Netraya.git
cd Netraya

```
## 🖥️ Backend Setup

Open a terminal and run:

```bash
cd server
npm install
npm start

```
The backend will run on:

```bash
http://localhost:5000

```
## 🖥️ Frontend Setup

Open a terminal and run:

```bash
cd client
npm install
npm run dev

```
The backend will run on:

```bash
http://localhost:5173

```

# 🚀 Future Improvements

- Online Appointment Booking System
- Electronic Health Records (EHR) & Prescription Storage
- Integration with Optical Store Inventory
- Email & SMS Notifications for Token Status
- Doctor Analytics & Patient Visit Reports
- Cloud Storage Integration for Medical Scans
- Automated Testing Framework

# 💡 Key Learnings

Through this project, I gained practical experience in:

- Building RESTful APIs using Express.js and Node.js
- React component-based architecture and state management
- MySQL database modeling and relational queries using Sequelize
- Multi-role Authentication and Authorization
- Full-stack application lifecycle management
- Designing intuitive healthcare management user flows
- Frontend and backend integration using Axios

# 👩‍💻 Developer

## Rizwana 💙

**B.Tech – Computer Science & Engineering**

### GitHub

https://github.com/Rizwana200

---

# 💙 Netraya

**CARE • VISION • PRECISION**

A full-stack eye clinic management system built to provide a simple, organized, and efficient digital experience for patients, doctors, and clinic staff.

Built with:

**React.js • Node.js • Express.js • MySQL**

## 🔗 GitHub Repository
```bash

https://github.com/Rizwana200/Netraya.git

```
