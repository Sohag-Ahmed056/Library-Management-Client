# 📚 Library Management Client

A **minimal library management system** built with **React**, **TypeScript**, **Redux Toolkit Query**, **Tailwind CSS**, and **shadcn/ui**. This is the client-side of a RESTful library app where users can manage books, borrow them, and view summaries—**no authentication required**.

### 🌐 Live Demo
> [((https://library-management-client-vosp.vercel.app/)]


---

## 🚀 Features

### ✅ Public Routes
- All pages are open to all users (no login).
- Navigation handled via `react-router-dom`.

### 📘 Book Management
- View all books in a table format.
- Add new books via form.
- Edit and delete existing books.
- Conditional availability based on copy count.

### 📥 Borrow Book
- Borrow a book with quantity and due date.
- Quantity is limited by available copies.
- Copies auto-decrease on borrow.
- Unavailable status if copies reach 0.

### 📊 Borrow Summary
- View total quantity borrowed per book.
- Aggregated data fetched from API.

---

## 🧱 Tech Stack

| Tech               | Purpose                          |
|--------------------|----------------------------------|
| React + Vite       | UI Framework + Fast Bundler      |
| TypeScript         | Type Safety                      |
| Redux Toolkit Query| API Handling & State Mgmt        |
| Tailwind CSS       | Styling                          |
| shadcn/ui          | Accessible UI Components         |
| Vercel             | Deployment                       |

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/library-management-client.git
cd library-management-client
npm install
npm run dev
