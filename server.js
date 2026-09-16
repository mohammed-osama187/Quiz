const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// SSE Connected Clients
let sseClients = [];

// Helper to read DB
function readDB() {
  const defaultSettings = { timeLimit: 60, easyCount: 5, mediumCount: 5, hardCount: 5 };
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { questions: { easy: [], medium: [], hard: [] }, settings: defaultSettings };
    }
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    if (!parsed.settings) parsed.settings = defaultSettings;
    return parsed;
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { questions: { easy: [], medium: [], hard: [] }, settings: defaultSettings };
  }
}

// Helper to write DB & notify SSE clients
function writeDB(data) {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    notifyClients(data);
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err);
    return false;
  }
}

// Broadcast live SSE update to all connected clients
function notifyClients(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(client => client.res.write(payload));
}

// API Routes
app.get('/api/db', (req, res) => {
  res.json(readDB());
});

// SSE Stream for Live Real-time Sync across all open browsers
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = Date.now() + '_' + Math.random();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  // Send current state immediately on connect
  res.write(`data: ${JSON.stringify(readDB())}\n\n`);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

// Add new question
app.post('/api/questions', (req, res) => {
  const { diff, q, opts, ans } = req.body;
  if (!diff || !q || !opts || !ans) {
    return res.status(400).json({ error: 'All question fields are required' });
  }

  const db = readDB();
  if (!db.questions) db.questions = { easy: [], medium: [], hard: [] };
  if (!db.questions[diff]) db.questions[diff] = [];

  db.questions[diff].push({ q, opts, ans });
  writeDB(db);

  res.json({ success: true, db });
});

// Edit existing question
app.put('/api/questions', (req, res) => {
  const { diff, index, q, opts, ans } = req.body;
  if (!diff || index === undefined || !q || !opts || !ans) {
    return res.status(400).json({ error: 'All parameters are required' });
  }

  const db = readDB();
  if (db.questions && db.questions[diff] && db.questions[diff][index] !== undefined) {
    db.questions[diff][index] = { q, opts, ans };
    writeDB(db);
    res.json({ success: true, db });
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

// Delete question
app.delete('/api/questions', (req, res) => {
  const { diff, index } = req.body;
  if (!diff || index === undefined) {
    return res.status(400).json({ error: 'diff and index are required' });
  }

  const db = readDB();
  if (db.questions && db.questions[diff] && db.questions[diff][index] !== undefined) {
    db.questions[diff].splice(index, 1);
    writeDB(db);
    res.json({ success: true, db });
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

// Update settings (Time limit, Question count & distribution)
app.post('/api/settings', (req, res) => {
  const { timeLimit, easyCount, mediumCount, hardCount } = req.body;
  const db = readDB();

  db.settings = {
    timeLimit: Math.max(10, Number(timeLimit) || 60),
    easyCount: Math.max(0, Number(easyCount) || 0),
    mediumCount: Math.max(0, Number(mediumCount) || 0),
    hardCount: Math.max(0, Number(hardCount) || 0)
  };

  writeDB(db);
  res.json({ success: true, db });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Local JSON Database: ${DB_PATH}`);
});
