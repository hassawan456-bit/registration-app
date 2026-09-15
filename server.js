const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
  const { firstName, lastName, email, phone, password, gender, dob, city } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ success: false, message: "Required fields are empty!" });
  }

  const user = { id: users.length + 1, firstName, lastName, email, phone, gender, dob, city, createdAt: new Date() };
  users.push(user);

  console.log("New Registration:", user);
  res.json({ success: true, message: "Registration Successful!", user: { firstName, lastName, email } });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
