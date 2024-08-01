import express from "express";
import { Category } from "./categories";

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

export default router;
