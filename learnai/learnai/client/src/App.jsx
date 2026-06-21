import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import LearnPage from "./components/LearnPage.jsx";
import HistoryPage from "./components/HistoryPage.jsx";
import RevisionPage from "./components/RevisionPage.jsx";

export default function App() {
  const [view, setView] = useState("learn");
  const [sessionRefresh, setSessionRefresh] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  function handleSessionSaved() {
    setSessionRefresh((n) => n + 1);
  }

  return (
    <div className="app-layout">
      <Sidebar
        view={view}
        setView={setView}
        sessions={[]}
        currentAnswers={currentAnswers}
        totalQuestions={totalQuestions}
      />

      {view === "learn" && (
        <LearnPage
          onSessionSaved={handleSessionSaved}
          onAnswersUpdate={setCurrentAnswers}
          onQuestionsUpdate={setTotalQuestions}
        />
      )}
      {view === "history" && (
        <HistoryPage refreshKey={sessionRefresh} />
      )}
      {view === "revision" && (
        <RevisionPage onSessionSaved={handleSessionSaved} />
      )}
    </div>
  );
}
