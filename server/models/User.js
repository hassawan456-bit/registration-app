const db = require("../db");

const User = {
  create(data) {
    const stmt = db.prepare(`
      INSERT INTO users (firstName, lastName, email, password, phone, gender, dob, city)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.phone,
      data.gender,
      data.dob,
      data.city
    );
    return this.findById(result.lastInsertRowid);
  },

  findByEmail(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  },

  findById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  },

  findAll() {
    return db.prepare("SELECT * FROM users ORDER BY id DESC").all();
  },
};

module.exports = User;