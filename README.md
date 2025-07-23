# Knowledge Base Application

A modern internal knowledge base system designed to replace limited or outdated documentation tools. This app supports easy article creation, editing, categorization, and powerful analytics to help IT teams maintain structured and useful documentation.

---

## Features

- Rich article editor with WYSIWYG (TinyMCE)
- Article categorization and tagging
- Full-text search (title, content, category, tags)
- Dashboard with analytics:
  - Total articles
  - Missing category or tags
  - Articles by category (bar chart)
  - Articles by tag (bar chart)
  - Articles created per month (line chart)
  - Recently updated articles
  - Top viewed articles
- View tracking using a `page_views` counter
- Admin interface for managing articles
- Dark mode support
- Local image and file upload

---

## Tech Stack

- Frontend: React, Bootstrap, Recharts, TinyMCE
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- File Uploads: Multer

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/knowledge-base.git
cd knowledge-base

cd backend
npm install

cd ../frontend
npm install

cd backend
npm run dev

cd frontend
npm start

```

Create .env file in /backend directory with the following:
MONGO_URI=mongodb://localhost:27017/knowledgebase
PORT=5000


Project Structure
knowledge-base/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── assets/


