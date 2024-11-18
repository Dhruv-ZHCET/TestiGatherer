import express from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
import Authmiddlware from "../middleware.js";

const prisma = new PrismaClient();
const editRouter = express.Router();

const SpaceSchema = z.object({
  spacename: z.string(),
  imageUrl: z.string().optional(),
  header: z.string(),
  customMessage: z.string(),
  questions: z.array(z.string()),
  hideImage: z.boolean(),
  redirect_url: z.string(),
  imagePreview: z.string().optional(),
  thankyouTitle: z.string(),
  thankyouMessage: z.string(),
});

editRouter.put("/", Authmiddlware, async (req, res) => {
  try {
    const {
      spacename,
      imageUrl,
      header,
      customMessage,
      questions,
      hideImage,
      redirect_url,
      imagePreview,
      thankyouTitle,
      thankyouMessage,
    } = req.body;

    const { spaceName } = req.query; // Query parameter for finding the space

    // Validate request body
    const validationResult = SpaceSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    // First, check if the space exists
    const existingSpace = await prisma.space.findUnique({
      where: {
        space_name: spaceName, // Make sure this matches your Prisma schema
      },
    });

    if (!existingSpace) {
      return res.status(404).json({ error: "Space not found" });
    }

    // Update the space
    const SpaceResponse = await prisma.space.update({
      where: {
        space_name: spaceName,
      },
      data: {
        space_name: spacename,
        logo: imageUrl,
        header: header,
        customMessage: customMessage,
        hide_gif: hideImage,
        redirectPageUrl: redirect_url,
        thankyou_img_url: imagePreview,
        thankyou_title: thankyouTitle,
        thankyou_msg: thankyouMessage,
      },
    });

    // Delete existing questions for this space
    await prisma.question.deleteMany({
      where: {
        spaceId: SpaceResponse.id,
      },
    });

    // Create new questions
    const updatedQuestions = await Promise.all(
      questions.map((question) =>
        prisma.question.create({
          data: {
            spaceId: SpaceResponse.id,
            question: question,
          },
        })
      )
    );

    res.status(200).json({
      message: "Space updated successfully",
      space: SpaceResponse,
      questions: updatedQuestions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
});

export default editRouter;
