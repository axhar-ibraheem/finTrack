# Fintrak - Personal Finance Dashboard

A feature-rich personal finance dashboard built with React, TypeScript, and Redux Toolkit. Fintrak helps users track transactions, understand spending patterns, and visualize financial activity through an intuitive and responsive interface.

---

## Live Demo

> Run locally with `npm run dev`  
> Or view live: [Live Demo](https://fintrack-axhar.netlify.app/)

---

## 🐳 Run with Docker

Make sure Docker is installed on your system.

Build the Docker image
`docker build -t fintrack-dashboard .`
Run the container
`docker run -p 3000:80 fintrack-dashboard`
Open in browser
http://localhost:3000

## Features

### Core Features

**Dashboard Overview**

- Summary cards showing Total Balance, Income, Expenses, and Savings Rate.
- Balance trend area chart showing running balance over time.
- Spending breakdown donut chart with category legend.
- Monthly income vs expenses comparison bar chart.
- Recent transactions preview table.

**Transactions Management**

- Full transactions table with date, description, category, amount, and type.
- Search filtering by description.
- Dynamic month filter, derived from actual transaction data, updates automatically when new months are added.
- Filter by category and transaction type.
- Sort by date or amount in ascending or descending order.
- Add, edit, and delete transactions with loading states and confirmation dialogs.
- Form validation with inline error messages.

**Insights**

- Top spending category with percentage of total.
- Biggest single expense callout.
- Savings rate with health indicator.
- Month over month spending comparison.
- Recurring transaction detection.
- Most active month analysis.
- Savings health observation with personalized advice.
- Period filter: 1M, 3M, 6M, All, filters all insight data dynamically.

### UX Features

**Dark Mode - Three State**

- Light, Dark, and System modes.
- System mode follows OS preference in real time.
- Persists to localStorage across sessions.

**Skeleton Loaders**

- Stat cards, charts, tables, and insight cards have dedicated skeletons
- Shown during initial data fetch from mock API

**Mobile Responsive**

- Sidebar collapses to a slide-over drawer on mobile.
- All pages adapt gracefully to different viewports.

---

## Tech Stack

| Concern     | Choice                  |
| ----------- | ----------------------- |
| Framework   | React 19 + Vite         |
| Language    | TypeScript, strict mode |
| Styling     | Tailwind CSS v4         |
| State       | Redux Toolkit           |
| Routing     | React Router v6         |
| Charts      | Recharts                |
| Date Picker | react-datepicker        |
| Icons       | Lucide React            |
| Date Utils  | date-fns                |
| IDs         | uuid                    |
