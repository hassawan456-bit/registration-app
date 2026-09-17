const db = require("../db");

const User = {
  async create(data) {
    if (db.type === "pg") {
      const { rows } = await db.pool.query(
        `INSERT INTO users ("firstName","lastName",email,password,phone,gender,dob,city)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [data.firstName, data.lastName, data.email, data.password, data.phone, data.gender, data.dob, data.city]
      );
      return rows[0];
    }
    const stmt = db.conn.prepare(`
      INSERT INTO users (firstName, lastName, email, password, phone, gender, dob, city)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.firstName, data.lastName, data.email, data.password,
      data.phone, data.gender, data.dob, data.city
    );
    return this.findById(result.lastInsertRowid);
  },

  async findByEmail(email) {
    if (db.type === "pg") {
      const { rows } = await db.pool.query("SELECT * FROM users WHERE email = $1", [email]);
      return rows[0];
    }
    return db.conn.prepare("SELECT * FROM users WHERE email = ?").get(email);
  },

  async findById(id) {
    if (db.type === "pg") {
      const { rows } = await db.pool.query("SELECT * FROM users WHERE id = $1", [id]);
      return rows[0];
    }
    return db.conn.prepare("SELECT * FROM users WHERE id = ?").get(id);
  },

  async findAll() {
    if (db.type === "pg") {
      const { rows } = await db.pool.query("SELECT * FROM users ORDER BY id DESC");
      return rows;
    }
    return db.conn.prepare("SELECT * FROM users ORDER BY id DESC").all();
  },
};

module.exports = User;