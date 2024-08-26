import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UserRouter = express.Router();

const uservalidationschema = zod.object({
  email: zod.string().email(),
  firstname: zod.string(),
  password: zod.string(),
});

const signinvalidationschema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

UserRouter.post("/signup", async (req, res) => {
  try {
    const { email, firstname, password } = req.body;

    const validationResult = uservalidationschema.safeParse(req.body);
    console.log(validationResult);
    if (
      !validationResult.success ||
      email == "" ||
      firstname == "" ||
      password == ""
    ) {
      return res.status(400).json({ error: validationResult.error });
    }

    const UserResponse = await prisma.user.create({
      data: {
        email: req.body.email,
        firstName: req.body.firstname,
        password: req.body.password,
      },
    });

    if (UserResponse) {
      console.log(UserResponse);
      const token = jwt.sign(
        { email: UserResponse.email, firstname: UserResponse.firstName },
        JWT_SECRET
      );

      res.status(200).json({
        message: "User created successfully",
        UserResponse,
        token: token,
      });
    } else {
      res.status(500).json({ error: "User creation failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

UserRouter.post("/signin", async (req, res) => {
  const validationResult = signinvalidationschema.safeParse(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (!validationResult.success || email == "" || password == "") {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const FindUserdetail = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    console.log(FindUserdetail);
    if (FindUserdetail) {
      res.status(200).json({
        message: "User logged in successfully",
        FindUserdetail,
      });
    } else {
      res.status(500).json({ error: "User not logged in successfully" });
    }
  } catch (e) {
    res.status(500).json({ error: "internal server error" });
  }
});

export default UserRouter;
