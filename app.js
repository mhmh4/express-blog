import path from "path";
import { fileURLToPath } from "url";

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nunjucks from "nunjucks";
import jwt from "jsonwebtoken";
import nocache from "nocache";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

dotenv.config();

// temporary data

const posts = [
  { title: "title 1", content: "content 1" },
  { title: "title 2", content: "content 2" },
  { title: "title 3", content: "content 3" },
];

app.use(express.json());
// app.use(express.static("./views"));
app.use(cors());
app.use(nocache());

nunjucks.configure("views", { express: app, watch: true });

// function generateAccessToken(username) {
//   return jwt.sign(username, process.env.SECRET_KEY, { expiresIn: "1800s" });
// }

// app.post("/api/users/new", (req, res) => {
//   const token = generateAccessToken({ username: req.body.username });
//   res.json({ token: token });
// });

app.get("/login", (req, res) => {
  return res.render("login.html");
});

app.get("/posts", (req, res) => {
  return res.render("posts.html", { posts: posts });
});

app.get("/api/posts", async (req, res) => {
  return res.json({ foo: "foo", bar: "bar", baz: "baz" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
