import express from "express";
import { validate } from "./schemas/Article";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const articles = await prisma.article.findMany();
  return res.send(articles);
});

router.get("/:id", async (req, res) => {
  const article = await prisma.article.findFirst({
    where: { id: req.params.id },
  });
  if (!article)
    return res.status(404).send("The article with the given id was not found.");
  return res.send(article);
});

router.post("/", async (req, res) => {
  //validera body
  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  //skapa det nya artikel objektet

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  const article = await prisma.article.create({
    data: {
      title: req.body.title,
      author: req.body.author,
      nbrPages: req.body.nbrPages,
      runTimeMinute: req.body.runTimeMinute,
      type: req.body.type,
      borrowDate: req.body.borrowDate,
      borrower: req.body.borrower,
      isBorrowable: req.body.isBorrowable,
      categoryId: req.body.categoryId,
    },
    include: {
      category: true,
    },
  });

  //skicka ut till klienten

  return res.status(201).send(article);
});

router.put("/:id", async (req, res) => {
  //kolla så att food med id route parametern finns
  const article = await prisma.article.findFirst({
    where: { id: req.params.id },
  });
  if (!article)
    return res.status(404).send("The article with the given id was not found.");
  //validera body
  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  //uppdatera artikeln
  const updatedArticle = await prisma.article.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      author: req.body.author,
      nbrPages: req.body.nbrPages,
      runTimeMinute: req.body.runTimeMinute,
      type: req.body.type,
      borrowDate: req.body.borrowDate,
      borrower: req.body.borrower,
      isBorrowable: req.body.isBorrowable,
      categoryId: req.body.categoryId,
    },
  });

  //skicka ut den uppdaterade artikeln
  return res.send(updatedArticle);
});

//Checka in och ut
router.put("/:id/borrow", async (req, res) => {
  // Kontrollera att artikeln finns
  const article = await prisma.article.findFirst({
    where: { id: req.params.id },
  });

  if (!article) {
    return res.status(404).send("The article with the given id was not found.");
  }

  if (!article.isBorrowable && !article.borrower) {
    return res.status(400).send("This article is not borrowable.");
  }

  // Checka in eller checka ut artikeln
  const updatedArticle = await prisma.article.update({
    where: { id: req.params.id },
    data: article.borrower
      ? { borrower: null, borrowDate: null, isBorrowable: true }
      : {
          borrower: req.body.borrower,
          borrowDate: new Date(),
          isBorrowable: false,
        },
  });

  // Returnera den uppdaterade artikeln
  return res.status(200).send(updatedArticle);
});

router.delete("/:id", async (req, res) => {
  const article = await prisma.article.findFirst({
    where: { id: req.params.id },
  });

  if (!article)
    return res.status(404).send("The article with the given id was not found.");

  const deletedArticle = await prisma.article.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedArticle);
});

export default router;
