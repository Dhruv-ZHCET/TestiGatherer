import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";

const Authmiddlware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: "No authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.email = decoded.email;
    req.firstname = decoded.firstname;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default Authmiddlware;
