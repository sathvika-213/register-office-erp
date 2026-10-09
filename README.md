# Register Office ERP – My Student ERP Portal

A web-based university portal developed as part of the Service-Oriented Architecture (SOA), Programming and Microservices course. The system aims to make university circulars and student announcements easier to access through a modern, user-friendly interface.

## 🚀 Project Overview

The Register Office ERP portal organizes university announcements into categories so students can find important academic information quickly.

## ✨ Features

* Student registration and login interface
* Circular and notice management
* Important and academic notices
* Scholarship announcements
* Examination updates
* Events and certification notices
* Circular archive
* Search and category filtering
* Help and technical support interface

*Feature availability depends on the current implementation.*

## 🛠️ Technology Stack

* **Frontend:** React.js, JavaScript, HTML, CSS
* **Backend:** Java, Spring Boot
* **Messaging:** Apache Kafka
* **Build Tool:** Maven
* **Containerization:** Docker Compose
* **Version Control:** Git and GitHub

## 🏗️ Project Structure

```text
Registrar-Office-ERP/
├── register-office/          # Frontend application
├── register-office-backend/  # Spring Boot backend
├── docker-compose.yml        # Docker configuration
├── package-lock.json
└── README.md
```

## ⚙️ Prerequisites

Install the following tools before running the application:

* Node.js and npm
* Java JDK compatible with the Spring Boot project
* Maven or the included Maven Wrapper
* Apache Kafka
* Docker Desktop, if using Docker Compose

## ▶️ How to Run

### 1. Start the Frontend

Open a terminal and run:

```bash
cd register-office
npm install
npm run dev
```

Open the local URL displayed in the terminal.

### 2. Start the Backend

Open another terminal:

```bash
cd register-office-backend
```

On Windows PowerShell, run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend is configured to use port `8080`.

### 3. Start Kafka

Ensure Kafka is running and accessible at `localhost:9092`, as configured in the backend application.

Start Kafka before testing features that depend on messaging.

## 📨 Kafka Integration

Apache Kafka is intended to support asynchronous, event-driven communication. For example, publishing a circular can generate an event that a consumer processes for notification or other application workflows.

The producer, consumer, topics, and event handlers should be configured according to the implemented backend.

## 🎯 Project Objectives

* Apply Service-Oriented Architecture concepts.
* Develop a REST-based backend using Spring Boot.
* Demonstrate event-driven communication using Apache Kafka.
* Build a responsive and student-friendly web interface.
* Organize university notices into searchable categories.

## 🔮 Future Enhancements

* Role-based access for students and administrators
* Database-backed user and circular management
* Automated notifications for important announcements
* Improved authentication and authorization
* Analytics dashboard and reporting

## 👩‍💻 Author

**Sathvika**

GitHub: [@sathvika-213](https://github.com/sathvika-213)

## 📌 Academic Project

Developed for the Service-Oriented Architecture (SOA), Programming and Microservices course.
