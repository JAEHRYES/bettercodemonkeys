const STORAGE_KEY = "learnai_sessions";

export function getSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(session) {
  const sessions = getSessions();
  const newSession = {
    ...session,
    id: Date.now(),
    date: new Date().toISOString(),
  };
  sessions.unshift(newSession); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  return newSession;
}

export function clearSessions() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getSessionById(id) {
  return getSessions().find((s) => s.id === id) || null;
}

export function getWeakTopics() {
  const sessions = getSessions();
  // Return sessions where score < 70 — these are revision candidates
  return sessions.filter((s) => s.score < 70);
}
