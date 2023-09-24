import express from "express";
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

  if (count > 0) {
    res.send("found a user");
  } else {
    res.send("cannot find user");
  }
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
