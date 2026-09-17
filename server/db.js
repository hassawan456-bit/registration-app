const { DatabaseSync } = require("node:sqlite");
const path = require("path");

const db = new DatabaseSync(path.join(__dirname, "registration.sqlite"));

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