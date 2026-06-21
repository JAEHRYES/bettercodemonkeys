import { useState } from "react";
import { ChevronRight, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { getSessions, clearSessions } from "../utils/storage.js";

function gradeIcon(grade) {
  if (grade === "correct") return <CheckCircle size={14} color="var(--green)" />;
  if (grade === "partial") return <Clock size={14} color="var(--amber)" />;
  return <XCircle size={14} color="var(--red)" />;
}

export default function HistoryPage({ refreshKey }) {
  const sessions = getSessions();
  const [expanded, setExpanded] = useState(null);

  function handleClear() {
    if (confirm("Clear all session history? This can't be undone.")) {
      clearSessions();
      window.location.reload();
    }
  }

  if (sessions.length === 0) {
    return (
      <div className="main-content">
        <div className="page-header">
          <h2>Session History</h2>
          <p>Your past learning sessions and scores will appear here.</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No sessions yet</h3>
          <p>Complete a learning session to see your history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h2>Session History</h2>
          <p>{sessions.length} session{sessions.length !== 1 ? "s" : ""} recorded</p>
        </div>
        <button className="btn btn-ghost" onClick={handleClear} style={{ fontSize: 13 }}>
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      {sessions.map((s) => {
        const date = new Date(s.date).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
        });
        const scoreColor = s.score >= 80 ? "var(--green)" : s.score >= 50 ? "var(--amber)" : "var(--red)";
        const isOpen = expanded === s.id;

        return (
          <div key={s.id}>
            <div
              className="history-item"
              onClick={() => setExpanded(isOpen ? null : s.id)}
            >
              <div>
                <div className="history-topic">{s.topic}</div>
                <div className="history-meta">{date} · {s.level || "intermediate"} · {s.answers.length} questions</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="history-score" style={{ color: scoreColor }}>{s.score}%</span>
                <ChevronRight
                  size={16}
                  color="var(--text-muted)"
                  style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}
                />
              </div>
            </div>

            {/* Expanded Q&A review */}
            {isOpen && (
              <div className="card" style={{ marginTop: -8, borderTop: "none", borderRadius: "0 0 12px 12px" }}>
                {s.answers.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 0",
                      borderBottom: i < s.answers.length - 1 ? "1px solid var(--navy-border)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ marginTop: 2 }}>{gradeIcon(a.grade)}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
                          Q{i + 1}. {a.question}
                        </p>
                        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                          <strong style={{ color: "var(--text-secondary)" }}>Your answer:</strong>{" "}
                          {a.userAnswer || <em>No answer</em>}
                        </p>
                        {a.grade !== "correct" && (
                          <p style={{ fontSize: 13, color: "var(--green)", marginTop: 4 }}>
                            <strong>Correct:</strong> {a.correct_answer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
