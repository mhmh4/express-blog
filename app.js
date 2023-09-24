import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nunjucks from "nunjucks";
import nocache from "nocache";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const app = express();
const port = 3000;

const prisma = new PrismaClient();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

nunjucks.configure("views", { express: app, watch: true });

app.use("/", authRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
