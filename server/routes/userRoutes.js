const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  try {
    const users = (await User.findAll()).map((u) => {
      const { password, ...safe } = u;
      return safe;
    });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/profile", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;