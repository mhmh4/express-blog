import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(cors());

function generateAccessToken(username) {
  return jwt.sign(username, process.env.SECRET_KEY, { expiresIn: "1800s" });
}

app.post("/api/users/new", (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json({ token: token });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
