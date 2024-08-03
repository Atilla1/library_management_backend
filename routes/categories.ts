import express from "express";
import { validate } from "./schemas/Category";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });
  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");
  return res.send(category);
});

router.post("/", async (req, res) => {
  const validation = validate(req.body);
  if (!validation.success) return res.status(400).send(validation.error.issues);

  const existingCategory = await prisma.category.findFirst({
    where: { name: req.body.name },
  });
  if (existingCategory) {
    return res.status(400).send("A category with this name already exists.");
  }

  const category = await prisma.category.create({
    data: {
      name: req.body.name,
    },
  });

  return res.status(201).send(category);
});

router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    return res
      .status(404)
      .send("The category with the given id was not found.");
  }

  const connectedArticles = await prisma.article.findFirst({
    where: { categoryId },
  });

  if (connectedArticles) {
    return res
      .status(400)
      .send(
        "The category cannot be deleted because it is associated with articles."
      );
  }

  await prisma.category.delete({
    where: { id: categoryId },
  });

  return res.status(200).send(category);
});

export default router;
