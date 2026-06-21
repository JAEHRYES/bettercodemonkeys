import { useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import QuestionCard from "./QuestionCard.jsx";
import ScoreSummary from "./ScoreSummary.jsx";
import { generateQuestions } from "../utils/api.js";
import { saveSession } from "../utils/storage.js";

const LEVELS = ["beginner", "intermediate", "advanced", "expert"];
const TYPES = ["mixed", "multiple_choice", "short_answer"];
const COUNTS = [3, 5, 8, 10];

const EXAMPLES = [
  "Python list comprehensions",
  "The French Revolution",
  "Photosynthesis in plants",
  "JavaScript async/await",
  "Newton's laws of motion",
  "SQL JOIN types",
];

export default function LearnPage({ onSessionSaved }) {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("intermediate");
  const [count, setCount] = useState(5);
  const [qtype, setQtype] = useState("mixed");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionDone, setSessionDone] = useState(false);

  const allAnswered = questions.length > 0 && answers.filter(Boolean).length === questions.length;

  async function handleGenerate(e) {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers([]);
    setSessionDone(false);

    try {
      const data = await generateQuestions({ topic: topic.trim(), level, numQuestions: count, questionType: qtype });
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

    const session = {
      topic,
      level,
      score,
      answers: questions.map((q, i) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        userAnswer: answers[i]?.userAnswer || "",
        grade: answers[i]?.grade || "incorrect",
      })),
    };

    saveSession(session);
    onSessionSaved();
    setSessionDone(true);
  }

  function handleReset() {
    setQuestions([]);
    setAnswers([]);
    setSessionDone(false);
  }

  function handleNewTopic() {
    setTopic("");
    setQuestions([]);
    setAnswers([]);
    setSessionDone(false);
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>What do you want to learn?</h2>
        <p>Be as specific as you like — the more detail, the better the questions.</p>
      </div>

      {/* Topic form */}
      {!questions.length && !loading && (
        <div className="card">
          <form className="topic-form" onSubmit={handleGenerate}>
            <div>
              <label className="field-label">Topic</label>
              <input
                className="text-input"
                type="text"
                placeholder="e.g. Python list comprehensions, intermediate"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                autoFocus
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    className="tag tag-blue"
                    style={{ cursor: "pointer", border: "none" }}
                    onClick={() => setTopic(ex)}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div>
                <label className="field-label">Difficulty</label>
                <select className="text-input" value={level} onChange={(e) => setLevel(e.target.value)}>
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">Question Type</label>
                <select className="text-input" value={qtype} onChange={(e) => setQtype(e.target.value)}>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div>
                <label className="field-label">Number of Questions</label>
                <select className="text-input" value={count} onChange={(e) => setCount(Number(e.target.value))}>
                  {COUNTS.map((n) => (
                    <option key={n} value={n}>{n} questions</option>
                  ))}
                </select>
              </div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={!topic.trim()}>
              <Sparkles size={16} /> Generate Questions
            </button>
          </form>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card" style={{ borderColor: "var(--red)", background: "var(--red-dim)" }}>
          <p style={{ color: "var(--red)" }}>⚠ {error}</p>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
            Make sure your server is running and your ANTHROPIC_API_KEY is set in server/.env
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          <p className="loading-text">Generating your questions…</p>
        </div>
      )}

      {/* Questions */}
      {questions.length > 0 && !sessionDone && (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h3 style={{ fontWeight: 700 }}>{topic}</h3>
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <span className="tag tag-blue">{level}</span>
                <span className="tag tag-amber">{questions.length} questions</span>
              </div>
            </div>
            <button className="btn btn-ghost" onClick={handleNewTopic} style={{ fontSize: 13 }}>
              ← New Topic
            </button>
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
                Finish Session & Save Results
              </button>
            </div>
          )}
        </>
      )}

      {/* Score summary */}
      {sessionDone && (
        <ScoreSummary
          questions={questions}
          answers={answers.filter(Boolean)}
          topic={topic}
          onReset={handleReset}
          onNewTopic={handleNewTopic}
        />
      )}
    </div>
  );
}
