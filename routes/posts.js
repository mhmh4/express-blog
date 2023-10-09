import express from "express";
import { PrismaClient } from "@prisma/client";

import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.render("posts.html", { posts: posts });
});

router.get("/new", authenticateToken, (req, res) => {
  return res.render("new_post.html");
});

router.post("/new", authenticateToken, async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  await prisma.post.create({
    data: {
      title: title,
      content: content,
      user: {
        connect: {
          username: req.user.username,
        },
      },
    },
  });

  return res.redirect("/posts");
});

export default router;
