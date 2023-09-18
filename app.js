import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nunjucks from "nunjucks";
import jwt from "jsonwebtoken";
import nocache from "nocache";
import { PrismaClient } from "@prisma/client";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const prisma = new PrismaClient();

dotenv.config();

// temporary data

const posts = [
  { title: "title 1", content: "content 1" },
  { title: "title 2", content: "content 2" },
  { title: "title 3", content: "content 3" },
];

app.use(express.urlencoded({ extended: true }));
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

app.get("/", (req, res) => {
  return res.redirect("/posts");
});

app.get("/login", (req, res) => {
  return res.render("login.html");
});

app.post("/register", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  res.redirect("/login");
});

app.get("/register", (req, res) => {
  return res.render("register.html");
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.render("posts.html", { posts: posts });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
