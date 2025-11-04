import express from "express";
import http from "http";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import rootRouter from "./routes";
import { Prisma, PrismaClient } from "@prisma/client";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyparser.json());
app.use(cookieParser());
app.use(compression());

app.use(rootRouter);

const server = http.createServer(app);

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
