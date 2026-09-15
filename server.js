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
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { leaderboard: [], questions: { easy: [], medium: [], hard: [] } };
    }
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { leaderboard: [], questions: { easy: [], medium: [], hard: [] } };
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

// Submit player score
app.post('/api/score', (req, res) => {
  const { name, score } = req.body;
  if (!name || score === undefined) {
    return res.status(400).json({ error: 'Name and score are required' });
  }

  const db = readDB();
  const newEntry = {
    id: String(Date.now() + '_' + Math.floor(Math.random() * 1000)),
    name: name.trim(),
    score: Number(score),
    date: new Date().toISOString()
  };

  db.leaderboard.push(newEntry);
  writeDB(db);

  res.json({ success: true, entry: newEntry, db });
});

// Delete score by ID
app.delete('/api/score/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.leaderboard = db.leaderboard.filter(item => String(item.id) !== String(id));
  writeDB(db);
  res.json({ success: true, db });
});

// Clear all leaderboard scores
app.delete('/api/leaderboard', (req, res) => {
  const db = readDB();
  db.leaderboard = [];
  writeDB(db);
  res.json({ success: true, db });
});

// Add new question
app.post('/api/questions', (req, res) => {
  const { diff, q, opts, ans } = req.body;
  if (!diff || !q || !opts || !ans) {
    return res.status(400).json({ error: 'All question fields are required' });
  }

  const db = readDB();
  if (!db.questions[diff]) {
    db.questions[diff] = [];
  }

  db.questions[diff].push({ q, opts, ans });
  writeDB(db);

  res.json({ success: true, db });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Local JSON Database: ${DB_PATH}`);
});
