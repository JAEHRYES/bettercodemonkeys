import { useState } from "react";
import { CheckCircle, XCircle, Clock, Send } from "lucide-react";
import { gradeAnswer } from "../utils/api.js";

export default function QuestionCard({ q, index, onAnswered, existingAnswer }) {
  const [selected, setSelected] = useState(existingAnswer?.selected || null);
  const [shortText, setShortText] = useState(existingAnswer?.userAnswer || "");
  const [result, setResult] = useState(existingAnswer || null);
  const [loading, setLoading] = useState(false);

  const isAnswered = !!result;

  async function handleMultipleChoice(option) {
    if (isAnswered) return;
    setSelected(option);
    const isCorrect = option === q.correct_answer;
    const res = {
      grade: isCorrect ? "correct" : "incorrect",
      score: isCorrect ? 100 : 0,
      feedback: isCorrect ? "Correct!" : `Incorrect. The right answer is: ${q.correct_answer}`,
      correct_answer: q.correct_answer,
      selected: option,
      userAnswer: option,
    };
    setResult(res);
    onAnswered(index, res);
  }

  async function handleShortAnswer() {
    if (!shortText.trim() || isAnswered) return;
    setLoading(true);
    try {
      const res = await gradeAnswer({
        question: q.question,
        userAnswer: shortText,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
      });
      const final = { ...res, userAnswer: shortText };
      setResult(final);
      onAnswered(index, final);
    } catch (err) {
      alert("Error grading answer: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const cardClass = `question-card ${
    result
      ? result.grade === "correct"
        ? "answered-correct"
        : result.grade === "partial"
        ? "answered-partial"
        : "answered-wrong"
      : ""
  }`;

  return (
    <div className={cardClass}>
      <div className="question-meta">
        <span className="q-badge">Q{index + 1}</span>
        <span className="q-type-badge">{q.type === "multiple_choice" ? "Multiple Choice" : "Short Answer"}</span>
        {result && (
          result.grade === "correct"
            ? <CheckCircle size={15} color="var(--green)" />
            : result.grade === "partial"
            ? <Clock size={15} color="var(--amber)" />
            : <XCircle size={15} color="var(--red)" />
        )}
      </div>

      <p className="question-text">{q.question}</p>

      {/* Multiple choice */}
      {q.type === "multiple_choice" && q.options && (
        <div className="options-list">
          {q.options.map((opt) => {
            let cls = "option-btn";
            if (result) {
              if (opt === q.correct_answer) cls += " correct";
              else if (opt === selected && opt !== q.correct_answer) cls += " incorrect";
            } else if (opt === selected) {
              cls += " selected";
            }
            return (
              <button
                key={opt}
                className={cls}
                onClick={() => handleMultipleChoice(opt)}
                disabled={isAnswered}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Short answer */}
      {q.type === "short_answer" && (
        <div>
          <textarea
            className="answer-textarea"
            placeholder="Type your answer here..."
            value={shortText}
            onChange={(e) => setShortText(e.target.value)}
            disabled={isAnswered}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) handleShortAnswer();
            }}
          />
          {!isAnswered && (
            <div className="submit-row">
              <button
                className="btn btn-primary"
                onClick={handleShortAnswer}
                disabled={loading || !shortText.trim()}
              >
                {loading ? (
                  <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Grading…</>
                ) : (
                  <><Send size={14} /> Submit Answer</>
                )}
              </button>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>⌘+Enter to submit</span>
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {result && (
        <div className={`feedback-box ${result.grade}`}>
          <strong>
            {result.grade === "correct" ? "✓ Correct!" : result.grade === "partial" ? "◑ Partially correct" : "✗ Incorrect"}
            {result.score !== undefined && result.grade !== "correct" && ` (${result.score}%)`}
          </strong>
          {result.feedback && result.feedback !== result.correct_answer && (
            <span>{result.feedback}</span>
          )}
          <div className="feedback-explanation">{q.explanation}</div>
        </div>
      )}
    </div>
  );
}
