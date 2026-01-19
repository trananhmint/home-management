# Home Management System

---

## Overview
- Home Management System is a web-based application designed to support individual landlords in managing rental houses and rooms.
- The system focuses on operational management including tenants, rooms, invoices, and monthly expenses.
- This project is designed for small-scale house rental business models, not full property management systems.

---

## Business Scope
- Manage multiple landlords in one system.
- Each landlord can manage multiple houses.
- Each house can contain multiple rooms.
- Each room can have multiple tenants over time.
- Support monthly billing and expense tracking.
- Focus on real rental workflows commonly used in Vietnam.

---

## Key Features
- Landlord account management.
- Multi-house management per landlord.
- Room creation and occupancy tracking.
- Tenant move-in and move-out history.
- Monthly invoice generation.
- Expense calculation (electricity, water, internet, others).
- Room status tracking (occupied / available).
- Centralized invoice and expense management.

---

## System Architecture
- Frontend architecture using React and TypeScript.
- Separation of concerns:
  - UI layer.
  - Service layer for Supabase communication.
  - Data layer for database interaction.
- Supabase is used for authentication and database management.
- Architecture allows future feature expansion.

---

## Database Design
- users
  - id
  - fullName
  - dateOfBirth
  - gender
  - phone
  - role
  - password
  - permanentAddress
  - dateOfIssue
  - auth_user_id
  - createdAt

- houses
  - id
  - name
  - address
  - lessorId
  - createdAt

- rooms
  - id
  - houseId
  - name
  - price
  - isOccupied
  - createdAt

- room_tenants
  - id
  - roomId
  - tenantId
  - moveInDate
  - moveOutDate
  - isStaying
  - createdAt

- invoices
  - id
  - roomId
  - term
  - createdAt

- expenses
  - id
  - type (electricity, water, internet, others)
  - unitPrice
  - oldIndex
  - newIndex
  - amount
  - invoiceId

---

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- PostgreSQL
- Git & GitHub

---

## Environment Setup
- Clone the repository.
- Install dependencies.
- Create environment variables.
- Connect to Supabase project.

---

## Supabase Configuration
- Create a Supabase account.
- Create a new project.
- Get the following keys:
  - SUPABASE_URL
  - SUPABASE_ANON_KEY

Create a `.env` file in the root directory:

- VITE_SUPABASE_URL=your_supabase_url
- VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Note:
- Do not commit the `.env` file.
- Environment variables are accessed via `import.meta.env`.

---

## Development Scripts
- Install dependencies:
  - npm install
  - pnpm install

- Run development server:
  - npm run dev

- Build project:
  - npm run build

- Preview production build:
  - npm run preview

---

## Roadmap
- Export invoice data to Excel for tax reporting.
- Monthly, quarterly, and yearly revenue reports.
- Google Sheets integration for invoice editing.
- Rental contract storage for tenants.
- Identity document image storage (front, back, portrait).
- Improve role-based access control.

---

## License
- MIT License
