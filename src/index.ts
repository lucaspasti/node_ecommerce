import express from "express";
import http from "http";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { stat } from "fs";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyparser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

app.get("/", (req, res) => {
  try {
    console.log("Root endpoint hit");
    res.status(200).send("Hello, World!");
  } catch (error) {
    console.error("Error handling root endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
});
