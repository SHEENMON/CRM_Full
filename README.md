# CRM Project

A fullstack Customer Relationship Management (CRM) system built with **Django** (backend) and **React.js** (frontend). This project supports user authentication, CRUD operations for managers, departments, and other features.

---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Requirements](#requirements)  
- [Setup](#setup)  
  - [Backend](#backend-setup)  
  - [Frontend](#frontend-setup)  
- [Environment Variables](#environment-variables)  
- [Running Locally](#running-locally)  
- [Deployment](#deployment)  
- [Admin Credentials](#admin-credentials)  
- [API Documentation](#api-documentation)  
- [Demo / Live Links](#demo-live-links)  

---

## Features

- Admin login and authentication with token-based security  
- CRUD operations for managers, departments, and staff  
- Toggle active/inactive status for managers and staff  
- Mobile-responsive UI  
- REST API using Django REST Framework  
- Frontend built with React.js and Tailwind CSS  

---

## Project Structure

CRM-Project/
├─ CRM_backend/ # Django backend
│ ├─ manage.py
│ ├─ crm_backend/ # Django project folder
│ ├─ crm/ # Django apps
│ ├─ migrations/
│ └─ .env.example # Example env file
├─ crm/ # React.js frontend
│ ├─ package.json
│ ├─ src/
│ ├─ public/
│ └─ .env.example # Example env file
├─ .gitignore # Root gitignore
└─ README.md # Project README


> Note: `.env` files are **not included** in the repo. Use `.env.example` as a template.

---

## Requirements

- Python 3.10+  
- Django 4.x  
- Node.js 18+  
- npm / yarn  
- PostgreSQL (for production)  

---


## Setup

### Backend Setup

1. Navigate to backend:


cd CRM_backend

## Create a virtual environment and activate it

python -m venv env
# Windows
env\Scripts\activate
# macOS/Linux
source env/bin/activate

## Install dependencies:
pip install -r requirements.txt
## Create .env file (see .env.example) with your local/production settings.
## Apply migrations:
python manage.py migrate
## Create superuser (optional if not using .env auto-creation):
## python manage.py createsuperuser
## Run the server:
## python manage.py runserver

## Frontend Setup

## Navigate to frontend:
cd frontend
## Install dependencies:
npm install
## Create .env file (see .env.example) and set:
## Start frontend:
npm start
Admin Credentials : login
Email: admin@gmail.com
Password: Admin@123


## Demo / Live Links

Backend: [https://crm-backend-vtrn.onrender.com]

Frontend: [https://crmprj.netlify.app/]