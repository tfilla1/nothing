const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS

const userRoutes = require('./routes/users')
const chatRoutes = require('./routes/chats')

const app = express();
const PORT = 3421;

// Enable CORS
app.use(cors({
  origin: "http://localhost:3422", // Allow only frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

app.use('/users', userRoutes)
app.use('/chats', chatRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
