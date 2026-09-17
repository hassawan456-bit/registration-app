const path = require("path");
const os = require("os");
const fs = require("fs");

const db = {};

if (process.env.DATABASE_URL) {
  const { Pool } = require("pg");
  db.type = "pg";
  db.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db.ready = db.pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      "firstName" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phone TEXT DEFAULT '',
      gender TEXT DEFAULT 'Other',
      dob TEXT DEFAULT '',
      city TEXT DEFAULT '',
      "createdAt" TEXT DEFAULT (now()::text)
    )
  `).then(() => "postgres").catch((err) => {
    console.error("Postgres schema init failed:", err.message);
    throw err;
  });
} else {
  const { DatabaseSync } = require("node:sqlite");
  db.type = "sqlite";
  const dataDir = process.env.DB_DIR || path.join(os.homedir(), ".registration-app");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  db.conn = new DatabaseSync(path.join(dataDir, "registration.sqlite"));
  db.conn.exec(`
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
  db.ready = Promise.resolve("sqlite");
}

module.exports = db;