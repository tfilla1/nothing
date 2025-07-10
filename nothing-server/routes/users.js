const express = require('express')
const router = express.Router()

const {users, chats} = require('../data')


// GET: Retrieve all users
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// GET: Retrieve a single user by ID
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

// POST: Create a new user
router.post("/", (req, res) => {
  const { name, username } = req.body;
  if (!name || !username) {
    return res.status(400).json({ message: "Name and username are required" });
  }
  const newUser = { id: users.length + 1, name, username };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT: Update a user by ID
router.put("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  user.name = name;
  user.email = email;
  res.status(200).json(user);
});

// DELETE: Remove a user by ID
router.delete("/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.status(204).send(); // No content
});

module.exports = router