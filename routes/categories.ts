import express from "express";
import { validate } from "./schemas/Category";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  // Hämta alla kategorier
  const categories = await prisma.category.findMany();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  // Hämta en kategori med angivet id
  const category = await prisma.category.findUnique({
    where: { id: req.params.id },
  });
  if (!category) {
    return res
      .status(404)
      .send("The category with the given id was not found.");
  }
  return res.send(category);
});

router.post("/", async (req, res) => {
  // Validera body
  const validation = validate(req.body);
  if (!validation.success) return res.status(400).send(validation.error.issues);

  // Validera om det redan finns en kategori med det namnet
  const existingCategory = await prisma.category.findFirst({
    where: { name: req.body.name },
  });
  if (existingCategory) {
    return res.status(400).send("A category with this name already exists.");
  }

  // Skapa ny kategori
  const category = await prisma.category.create({
    data: {
      name: req.body.name,
    },
  });

  // Skicka ut till klienten
  return res.status(201).send(category);
});

router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id;

  // Kontrollera om kategorin finns
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    return res
      .status(404)
      .send("The category with the given id was not found.");
  }

  // Kontrollera om några artiklar är kopplade till kategorin
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

  // Ta bort kategorin
  await prisma.category.delete({
    where: { id: categoryId },
  });

  // Skicka ut till klienten
  return res.status(200).send(category);
});

export default router;
