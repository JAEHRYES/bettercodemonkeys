# ⚡ LearnAI — Your Personal AI Tutor

A full-stack AI learning platform. Students input a topic, get custom questions, answer them, and receive AI-graded feedback. All sessions are saved for review, and the app generates personalised revision questions based on weak areas.

---

## 🗂 Project Structure

```
learnai/
├── client/          ← React frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── LearnPage.jsx
│       │   ├── QuestionCard.jsx
│       │   ├── ScoreSummary.jsx
│       │   ├── HistoryPage.jsx
│       │   └── RevisionPage.jsx
│       ├── utils/
│       │   ├── api.js
│       │   └── storage.js
│       └── styles/
│           └── global.css
│
├── server/          ← Express backend
│   ├── index.js
│   ├── .env         ← ⚠ PUT YOUR API KEY HERE
│   └── package.json
│
└── package.json     ← root workspace config
```

---

## 🚀 Setup (Step by Step)

### 1. Get your Anthropic API key
Go to https://console.anthropic.com → API Keys → Create Key  
Copy it.

### 2. Add your API key
Open `server/.env` and replace the placeholder:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3. Install dependencies
In the root `learnai/` folder, open a terminal and run:
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 4. Run the app
From the root `learnai/` folder:
```bash
npm run dev
```
This starts both the backend (port 3001) and frontend (port 5173) at the same time.

### 5. Open in browser
Go to: http://localhost:5173

---

## ✨ Features

- **Custom Questions** — Input any topic + difficulty level → Claude generates questions
- **Multiple Choice + Short Answer** — Mix of question types
- **AI Grading** — Short answers are graded by Claude with detailed feedback
- **Session History** — Every session saved to localStorage, expandable Q&A review
- **Revision Mode** — Analyses your weak areas and generates targeted revision questions
- **Session Tape** — Visual progress tracker in the sidebar

---

## 🛣 What to Build Next

1. **User accounts** — Add Supabase Auth so sessions persist across devices
2. **Database** — Replace localStorage with Supabase for real storage
3. **Scheduled revision emails** — Use a cron job + email API (Resend.com)
4. **Streak tracking** — Reward daily learning
5. **Subject folders** — Group questions by subject
6. **Export to PDF** — Print revision notes

---

## 🔧 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Pure CSS (no framework) |
| Backend | Node.js + Express |
| AI | Anthropic Claude API (claude-sonnet-4-6) |
| Storage | localStorage (upgrade to Supabase later) |
| Icons | Lucide React |
