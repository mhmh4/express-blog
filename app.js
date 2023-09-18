import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nunjucks from "nunjucks";
import nocache from "nocache";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;

const prisma = new PrismaClient();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

nunjucks.configure("views", { express: app, watch: true });

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
