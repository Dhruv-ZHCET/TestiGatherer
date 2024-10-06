import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SpaceinfofetchRouter = express.Router();

SpaceinfofetchRouter.get("/", Authmiddlware, async (req, res) => {
  const { spacename } = req.query; // Extract spacename from query

  try {
    const Findspaceinfo = await prisma.space.findUnique({
      where: {
        space_name: spacename, // Assuming `req.email` is set by Authmiddlware
      },
    });
    if (Findspaceinfo) {
      console.log(Findspaceinfo);
      res.status(200).json({
        spaceinfo: Findspaceinfo,
        firstname: req.firstname,
        email: req.email,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default SpaceinfofetchRouter;
