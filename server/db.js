const { DatabaseSync } = require("node:sqlite");
const os = require("os");
const path = require("path");
const fs = require("fs");

const dataDir = process.env.DB_DIR || path.join(os.homedir(), ".registration-app");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new DatabaseSync(path.join(dataDir, "registration.sqlite"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT DEFAULT '',
    gender TEXT DEFAULT 'Other',
    dob TEXT DEFAULT '',
    city TEXT DEFAULT '',
    createdAt TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;