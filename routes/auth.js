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
