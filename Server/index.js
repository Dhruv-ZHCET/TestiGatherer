import express from "express";
import cors from "cors";
import UserRouter from "./router/Userrouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", UserRouter);

// req and res (request and response)
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});