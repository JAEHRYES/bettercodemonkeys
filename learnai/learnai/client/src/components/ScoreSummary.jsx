import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from "lucide-react";

export default function ScoreSummary({ questions, answers, topic, onReset, onNewTopic }) {
  const total = questions.length;
  const correct = answers.filter((a) => a.grade === "correct").length;
  const partial = answers.filter((a) => a.grade === "partial").length;
  const wrong = answers.filter((a) => a.grade === "incorrect").length;
  const pct = Math.round(((correct + partial * 0.5) / total) * 100);

  const circumference = 2 * Math.PI * 50;
  const strokeDash = (pct / 100) * circumference;
  const color = pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--amber)" : "var(--red)";

  const message =
    pct >= 80 ? "Excellent work! 🎉" :
    pct >= 60 ? "Good effort! Keep practising." :
    "Keep going — revision will help! 💪";

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Session Complete</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>{topic}</p>

      <div className="score-ring-wrap" style={{ justifyContent: "center" }}>
        {/* SVG ring */}
        <svg className="score-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--navy-border)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
          <text x="60" y="60" textAnchor="middle" dominantBaseline="middle"
            fill={color} fontSize="22" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            {pct}%
          </text>
        </svg>

        <div className="score-stats">
          <div className="stat-block">
            <span className="stat-value green">{correct}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat-block">
            <span className="stat-value amber">{partial}</span>
            <span className="stat-label">Partial</span>
          </div>
          <div className="stat-block">
            <span className="stat-value red">{wrong}</span>
            <span className="stat-label">Wrong</span>
          </div>
          <div className="stat-block">
            <span className="stat-value" style={{ color: "var(--blue)" }}>{total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 24, fontSize: 16, fontWeight: 500, color: "var(--text-secondary)" }}>{message}</p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
        <button className="btn btn-ghost" onClick={onReset}>
          <RotateCcw size={14} /> Retry This Topic
        </button>
        <button className="btn btn-primary" onClick={onNewTopic}>
          <BookOpen size={14} /> New Topic
        </button>
      </div>
    </div>
  );
}
