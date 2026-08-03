<div align="center">

# 📋 Apply & Track

**A clean, visual Kanban board for managing your job search.**

Stop losing track of applications in messy spreadsheets. Add a company, drag its card across your board, and always know exactly where you stand — from *Applied* to *Interviewing* to *Offer* (or, hopefully not, *Rejected*).

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](#)

🔗 **[Live Demo](#)** (https://apply-n-track.vercel.app/) 

</div>

---

## ✨ Why I Built This

Applying to many jobs at once makes it easy to lose track of where each application stands, forget to follow up, or mix up which role belongs to which company. Spreadsheets work, but they feel clunky.

**Apply & Track** solves that with one clean, visual board — every application lives in a single place, and moving it forward is as easy as a drag.

---

## 🚀 Features

| | |
|---|---|
| 🔐 **Secure Accounts** | Sign up and log in with email & password — your data is private to you |
| 🗂️ **Auto-Ready Board** | A personal Kanban board with 5 columns (*Wish List, Applied, Interviewing, Offer, Rejected*) is set up the moment you sign up |
| ➕ **Rich Job Entries** | Track company, title, location, salary range, job link, tags, description, and personal notes |
| 🖱️ **Drag & Drop** | Move cards between columns instantly, or reorder them within a column |
| 📱 **Menu-Based Moves** | An alternative to dragging — handy on smaller screens |
| ✏️ **Full Editing** | Update any detail on any application, anytime |
| 🗑️ **Easy Cleanup** | Delete applications you no longer need to track |
| 🔍 **Live Search** | Filter by company name or job title as you type |
| 🚪 **Secure Sign-Out** | End your session safely when you're done |

---

## 🛠️ Tech Stack

| Tool | Role | Why It Was Chosen |
|---|---|---|
| **Next.js 16** | Web framework | Combines pages and server-side logic in one project |
| **TypeScript** | Type safety | Catches data-shape bugs before they happen |
| **MongoDB** | Database | Flexible, document-style storage that fits job data naturally |
| **Mongoose** | ODM for MongoDB | Clean schema definitions and queries |
| **Better Auth** | Authentication | Secure sign-up/sign-in/session handling, ready out of the box |
| **dnd-kit** | Drag & drop | Lightweight, accessible, purpose-built for React |
| **shadcn/ui + Radix UI** | UI components | Accessible, polished building blocks |
| **Tailwind CSS** | Styling | Fast, utility-first styling without separate CSS files |
| **React 19** | UI library | Industry-standard for interactive interfaces |

---

## 🧩 Technical Challenges & Solutions

<details>
<summary><strong>1. Instant board updates without a page reload</strong></summary>
<br>

**Problem:** Saving a card's new position to the database takes time — waiting for that before updating the UI feels sluggish.

**Solution:** The card moves on screen *instantly* (optimistic UI), while the save happens in the background. The user gets a fast, snappy experience with no visible lag.
</details>

<details>
<summary><strong>2. Keeping card order consistent</strong></summary>
<br>

**Problem:** Dragged cards need their order preserved correctly across reloads.

**Solution:** Each card stores a numeric order value spaced in steps of 100 (0, 100, 200…). Moving a card only shifts the values around it — no need to renumber the whole column.
</details>

<details>
<summary><strong>3. Zero-setup boards for new users</strong></summary>
<br>

**Problem:** Every new user needs a ready-to-go board immediately — with no manual setup step.

**Solution:** A database hook fires the instant an account is created, generating a board with all five default columns in the background before the user ever sees the dashboard.
</details>

<details>
<summary><strong>4. Protecting data between users</strong></summary>
<br>

**Problem:** Every read, write, or delete must be scoped to the logged-in user — otherwise data could leak across accounts.

**Solution:** Every server-side function verifies the current session and confirms ownership of the data before acting. Failed checks are rejected immediately.
</details>

---

📸 **[Screenshots](#)**


https://github.com/user-attachments/assets/0135077a-29a2-4e43-b67c-be79e0271779



## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AnushkaWijerathna/apply-n-track.git
cd apply-n-track

# 2. Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string_here
BETTER_AUTH_SECRET=any_long_random_string_here
BETTER_AUTH_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your connection string from the Atlas dashboard ("Connect") |
| `BETTER_AUTH_SECRET` | Any long, random string for signing auth tokens — [generate one here](https://generate-secret.vercel.app) |
| `BETTER_AUTH_URL` | Base URL of the app (`http://localhost:3000` for local dev) |

### Run It

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**, sign up, and your board will be ready instantly. 🎉

---

## 📁 Project Structure

```
apply-n-track/
├── app/                  # Pages (landing, dashboard, sign-in, sign-up)
├── components/           # Reusable UI pieces (Kanban board, job cards, forms)
├── lib/
│   ├── action/           # Server-side database operations (create, update, delete)
│   ├── auth/             # Authentication setup
│   ├── hooks/            # Shared logic for the board (drag-and-drop state)
│   └── models/           # Database schema definitions (Board, Column, Job)
└── public/               # Static files (images, icons)
```

---

## 👤 Author

**Anushka Wijerathna**

[![GitHub](https://img.shields.io/badge/GitHub-AnushkaWijerathna-181717?logo=github)](https://github.com/AnushkaWijerathna)
&nbsp;[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin&logoColor=white)](#)
&nbsp;[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange)](#)
