import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.render("posts.html", { posts: posts });
});

router.get("/new", (req, res) => {
  return res.render("new_post.html");
});

export default router;
