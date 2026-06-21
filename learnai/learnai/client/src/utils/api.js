const BASE = "/api";

export async function generateQuestions({ topic, level, numQuestions, questionType }) {
  const res = await fetch(`${BASE}/generate-questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, level, numQuestions, questionType }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Server error");
  }
  return res.json();
}

export async function gradeAnswer({ question, userAnswer, correctAnswer, explanation }) {
  const res = await fetch(`${BASE}/grade-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, userAnswer, correctAnswer, explanation }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Server error");
  }
  return res.json();
}

export async function generateRevision(sessionHistory) {
  const res = await fetch(`${BASE}/generate-revision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionHistory }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Server error");
  }
  return res.json();
}
