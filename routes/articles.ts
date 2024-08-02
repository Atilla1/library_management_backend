import express from "express";
import { Category, getCategories } from "./categories";
import { validate } from "./schemas/Article";

const router = express.Router();

export const articles: Article[] = [
  {
    id: "1-abcdid",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    nbrPages: 180,
    runTimeMinutes: 0,
    type: "Book",
    isBorrowable: true,
    category: { id: "11_catid", name: "Ficton" },
  },
  {
    id: "2-abcdid",
    title: "I Have No Mouth & I Must Scream",
    author: "Harlan Ellison",
    nbrPages: 0,
    runTimeMinutes: 125,
    type: "DVD",
    isBorrowable: true,
    category: { id: "22_catid", name: "Action" },
  },
  {
    id: "3-abcdid",
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    nbrPages: 0,
    runTimeMinutes: 120,
    type: "Audiobook",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { id: "33_catid", name: "Drama" },
  },
  {
    id: "4-abcdid",
    title: "I Am America",
    author: "Stephen Colbert ",
    nbrPages: 0,
    runTimeMinutes: 300,
    type: "DVD",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { id: "44_catid", name: "Romantik" },
  },
  {
    id: "5-abcdid",
    title: "Blue Sisters",
    author: "Coco Mellors ",
    nbrPages: 280,
    runTimeMinutes: 0,
    type: "Book",
    isBorrowable: true,
    category: { id: "44_catid", name: "Romantik" },
  },
  {
    id: "6-abcdid",
    title: "Intermezzo",
    author: "Sally Rooney",
    nbrPages: 280,
    runTimeMinutes: 0,
    type: "Reference book",
    isBorrowable: false,
    category: { id: "44_catid", name: "Romantik" },
  },
];

export interface Article {
  id: string;
  title: string;
  runTimeMinutes: number;
  author: string;
  nbrPages: number;
  type: string;
  isBorrowable?: boolean;
  category: Category;
  borrower?: string;
  borrowDate?: string;
}

router.get("/", (req, res) => {
  return res.send(articles);
});

router.get("/:id", (req, res) => {
  const article = articles.find((article) => article.id === req.params.id);
  if (!article)
    return res.status(404).send("The article with the given id was not found.");
  return res.send(article);
});

router.post("/", (req, res) => {
  //validera body
  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  //skapa det nya artikel objektet

  const category = getCategories().find(
    (category) => category.id === req.body.categoryId
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  const article: Article = {
    id: Date.now().toString(),
    author: req.body.author,
    title: req.body.title,
    type: req.body.type,
    nbrPages: req.body.nbrPages,
    runTimeMinutes: req.body.runTimeMinutes,
    borrowDate: req.body.borrowDate,
    borrower: req.body.borrower,
    isBorrowable: req.body.isBorrowable,
    category,
  };

  articles.push(article);

  //skicka ut till klienten

  return res.status(201).send(article);
});

router.put("/:id", (req, res) => {
  //kolla så att food med id route parametern finns
  const article = articles.find((article) => article.id === req.params.id);
  if (!article)
    return res.status(404).send("The article with the given id was not found.");
  //validera body
  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  const category = getCategories().find(
    (category) => category.id === req.body.categoryId
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  //uppdatera artikeln
  (article.author = req.body.author),
    (article.title = req.body.title),
    (article.type = req.body.type),
    (article.nbrPages = req.body.nbrPages),
    (article.runTimeMinutes = req.body.runTimeMinutes),
    (article.isBorrowable = req.body.isBorrowable),
    (article.category = category);

  //skicka ut den uppdaterade artikeln
  return res.send(article);
});

//Checka in och ut
router.put("/:id/borrow", (req, res) => {
  const article = articles.find((article) => article.id === req.params.id);
  if (!article) {
    return res.status(404).send("The article with the given id was not found.");
  }

  if (!article.isBorrowable) {
    return res.status(400).send("This article is not borrowable.");
  }

  if (article.borrower) {
    // Checka in artikel
    article.borrower = undefined;
    article.borrowDate = undefined;
    article.isBorrowable = true;
  } else {
    // Checka ut artikel
    article.borrower = req.body.borrower;
    article.borrowDate = new Date().toISOString();
    article.isBorrowable = false;
  }

  return res.send(article);
});

router.delete("/:id", (req, res) => {
  const article = articles.find((article) => article.id === req.params.id);

  //   if (article) articles.splice(articles.indexOf(article), 1);
  if (!article)
    return res.status(404).send("The article with the given id was not found.");

  const index = articles.indexOf(article);
  articles.splice(index, 1);

  return res.send(article);
});

export default router;
