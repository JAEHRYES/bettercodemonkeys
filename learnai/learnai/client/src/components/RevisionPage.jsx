import { useState } from "react";
import { RefreshCw, Zap } from "lucide-react";
import QuestionCard from "./QuestionCard.jsx";
import ScoreSummary from "./ScoreSummary.jsx";
import { getSessions, saveSession } from "../utils/storage.js";
import { generateRevision } from "../utils/api.js";

export default function RevisionPage({ onSessionSaved }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const sessions = getSessions();
  const allAnswered = questions.length > 0 && answers.filter(Boolean).length === questions.length;

  async function handleGenerate() {
    if (sessions.length === 0) return;
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers([]);
    setDone(false);

    try {
      const data = await generateRevision(sessions.slice(0, 10)); // last 10 sessions
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswered(index, result) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = result;
      return next;
    });
  }

  function handleFinish() {
    const filledAnswers = answers.filter(Boolean);
    const correct = filledAnswers.filter((a) => a.grade === "correct").length;
    const partial = filledAnswers.filter((a) => a.grade === "partial").length;
    const score = Math.round(((correct + partial * 0.5) / questions.length) * 100);

    saveSession({
      topic: "Weekly Revision",
      level: "revision",
      score,
      answers: questions.map((q, i) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        userAnswer: answers[i]?.userAnswer || "",
        grade: answers[i]?.grade || "incorrect",
      })),
    });
    onSessionSaved();
    setDone(true);
  }

  // Stats from history
  const avgScore = sessions.length
    ? Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length)
    : 0;

  const weakSessions = sessions.filter((s) => s.score < 70);

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Revision</h2>
        <p>AI-generated questions targeting your weak spots from past sessions.</p>
      </div>

      {!questions.length && !loading && !done && (
        <>
          {/* Stats overview */}
          {sessions.length > 0 && (
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                <div className="stat-block">
                  <span className="stat-value" style={{ color: "var(--blue)" }}>{sessions.length}</span>
                  <span className="stat-label">Total Sessions</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value" style={{ color: avgScore >= 70 ? "var(--green)" : "var(--amber)" }}>
                    {avgScore}%
                  </span>
                  <span className="stat-label">Average Score</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value" style={{ color: weakSessions.length > 0 ? "var(--red)" : "var(--green)" }}>
                    {weakSessions.length}
                  </span>
                  <span className="stat-label">Topics to Revise</span>
                </div>
              </div>

              {weakSessions.length > 0 && (
                <div style={{ marginTop: 20, borderTop: "1px solid var(--navy-border)", paddingTop: 16 }}>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10, fontFamily: "var(--mono)" }}>
                    WEAK AREAS (below 70%)
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {weakSessions.map((s) => (
                      <span key={s.id} className="tag" style={{
                        background: "var(--red-dim)", color: "var(--red)",
                        border: "1px solid rgba(245,101,101,0.2)"
                      }}>
                        {s.topic} — {s.score}%
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {sessions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔄</div>
              <h3>No sessions to revise yet</h3>
              <p>Complete some learning sessions first, then come back here for revision.</p>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleGenerate} style={{ fontSize: 15, padding: "14px 32px" }}>
              <Zap size={16} /> Generate Revision Questions
            </button>
          )}
        </>
      )}

      {error && (
        <div className="card" style={{ borderColor: "var(--red)", background: "var(--red-dim)" }}>
          <p style={{ color: "var(--red)" }}>⚠ {error}</p>
        </div>
      )}

      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          <p className="loading-text">Analysing your history and generating revision questions…</p>
        </div>
      )}

      {questions.length > 0 && !done && (
        <>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontWeight: 700 }}>Weekly Revision</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
              Focused on your weak areas
            </p>
          </div>

          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              q={q}
              index={i}
              onAnswered={handleAnswered}
              existingAnswer={answers[i]}
            />
          ))}

          {allAnswered && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <button className="btn btn-amber" onClick={handleFinish} style={{ fontSize: 15, padding: "14px 32px" }}>
                Finish Revision & Save
              </button>
            </div>
          )}
        </>
      )}

      {done && (
        <ScoreSummary
          questions={questions}
          answers={answers.filter(Boolean)}
          topic="Weekly Revision"
          onReset={() => { setQuestions([]); setAnswers([]); setDone(false); }}
          onNewTopic={() => { setQuestions([]); setAnswers([]); setDone(false); }}
        />
      )}
    </div>
  );
}
