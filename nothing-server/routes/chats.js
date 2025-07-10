const express = require("express");
const router = express.Router();

const { users, chats } = require("../data");


router.get("/", (req, res) => {
  // console.log({req, res})

  const chatsWithUsers = chats.map(chat => ({
    ...chat,
    user: users.find(u => u.id === chat.userId)
  }))

  res.status(200).json(chatsWithUsers);
});
router.post("/", (req, res) => {
  console.log({ body: req.body });
  const { text, userId } = req.body;
  if (!text || !userId) {
    return res.status(400).json({ message: "text and sender are required" });
  }
  const newChat = { id: chats.length + 1, text, userId };
  chats.push(newChat);

    const chatsWithUsers = {
    ...newChat,
    user: users.find(u => u.id === newChat.userId)
  }

  res.status(201).json(chatsWithUsers);
});

module.exports = router;
