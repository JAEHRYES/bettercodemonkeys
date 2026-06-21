import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Generate a set of questions on a topic ──────────────────────────────────
app.post("/api/generate-questions", async (req, res) => {
  const { topic, level, numQuestions = 5, questionType = "mixed" } = req.body;

  if (!topic) return res.status(400).json({ error: "Topic is required" });

  const prompt = `You are an expert tutor. Generate ${numQuestions} ${questionType} questions about: "${topic}".
Difficulty level: ${level || "intermediate"}.

Return ONLY valid JSON in this exact format, no markdown, no extra text:
{
  "topic": "${topic}",
  "level": "${level || "intermediate"}",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Question text here",
      "options": ["A) option", "B) option", "C) option", "D) option"],
      "correct_answer": "A) option",
      "explanation": "Why this is correct"
    },
    {
      "id": 2,
      "type": "short_answer",
      "question": "Question text here",
      "options": null,
      "correct_answer": "The expected answer",
      "explanation": "Detailed explanation"
    }
  ]
}

Mix multiple_choice and short_answer types. Make questions clear, educational, and progressively harder.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].text.trim();
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to generate questions. Check your API key and try again." });
  }
});

// ── Grade a short-answer response ───────────────────────────────────────────
app.post("/api/grade-answer", async (req, res) => {
  const { question, userAnswer, correctAnswer, explanation } = req.body;

  const prompt = `You are a strict but fair tutor grading a student's answer.

Question: ${question}
Expected answer: ${correctAnswer}
Student's answer: ${userAnswer}

Grade this answer and return ONLY valid JSON:
{
  "score": 0-100,
  "grade": "correct" | "partial" | "incorrect",
  "feedback": "Specific feedback on what was right/wrong",
  "correct_answer": "${correctAnswer}"
}

Be generous with partial credit if the core concept is right. Score 80-100 for correct, 40-79 for partial, 0-39 for incorrect.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].text.trim();
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to grade answer." });
  }
});

// ── Generate weekly revision questions based on history ─────────────────────
app.post("/api/generate-revision", async (req, res) => {
  const { sessionHistory } = req.body;

  if (!sessionHistory || sessionHistory.length === 0) {
    return res.status(400).json({ error: "No session history provided" });
  }

  // Summarise what topics were covered and where the user struggled
  const summary = sessionHistory.map(s => ({
    topic: s.topic,
    score: s.score,
    weakAreas: s.answers
      .filter(a => a.grade !== "correct")
      .map(a => a.question.substring(0, 80))
  }));

  const prompt = `You are a tutor creating a revision session. Here is the student's learning history:
${JSON.stringify(summary, null, 2)}

Create 5 revision questions that:
1. Focus on topics where they scored below 70%
2. Revisit concepts they got wrong
3. Mix question types

Return ONLY valid JSON:
{
  "topic": "Weekly Revision",
  "level": "revision",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "...",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct_answer": "A) ...",
      "explanation": "..."
    }
  ]
}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].text.trim();
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to generate revision questions." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ LearnAI server running on http://localhost:${PORT}`));
