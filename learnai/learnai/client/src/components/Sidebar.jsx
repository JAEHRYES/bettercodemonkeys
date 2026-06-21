import { BookOpen, History, RefreshCw, Zap } from "lucide-react";

export default function Sidebar({ view, setView, sessions, currentAnswers, totalQuestions }) {
  const answered = currentAnswers.length;
  const correct = currentAnswers.filter((a) => a.grade === "correct").length;
  const pct = totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0;

  const navItems = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "history", label: "Session History", icon: History },
    { id: "revision", label: "Revision", icon: RefreshCw },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>⚡ LearnAI</h1>
        <span>// your personal tutor</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-btn ${view === id ? "active" : ""}`}
            onClick={() => setView(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
      </nav>

      {/* Session tape — fills as questions are answered */}
      {totalQuestions > 0 && (
        <div className="session-tape">
          <div className="tape-label">Session Progress</div>
          <div className="tape-track">
            <div className="tape-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="tape-segments">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const ans = currentAnswers[i];
              let cls = "tape-dot";
              if (ans) {
                cls += ans.grade === "correct" ? " correct" : ans.grade === "partial" ? " answered" : " wrong";
              }
              return <div key={i} className={cls} />;
            })}
          </div>
          {answered > 0 && (
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>
              {correct}/{answered} correct
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
