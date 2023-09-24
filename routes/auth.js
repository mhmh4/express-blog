import dotenv from "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", (req, res) => {
  return res.redirect("/posts");
});

router.get("/login", (req, res) => {
  return res.render("login.html");
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  // const password = req.body.password;

  const count = await prisma.user.count({
    where: {
      username: username,
    },
  });

  if (count == 0) {
    return res.send("cannot find user");
  }

  const user = { username: username };

  const accessToken = jwt.sign(user, process.env.SECRET_KEY);
  return res.json({ accessToken: accessToken });
});

router.post("/register", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  res.redirect("/login");
});

router.get("/register", (req, res) => {
  return res.render("register.html");
});

export default router;
