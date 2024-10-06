import express from "express";
import cors from "cors";
import UserRouter from "./router/Userrouter.js";
import SpaceCreationRouter from "./router/SpaceCreation.js";
import SpacefetchingRouter from "./router/Spacefetching.js";
import SpaceinfofetchRouter from "./router/FetchspaceInfo.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/space-creation", SpaceCreationRouter);
app.use("/api/v1/space-fetch", SpacefetchingRouter);
app.use("/api/v1/spaceinfo", SpaceinfofetchRouter);

// req and res (request and response)
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
