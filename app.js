import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import nocache from "nocache";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

nunjucks.configure("./views", { express: app, watch: true });

app.use("/", authRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
