import express from "express";
import { validate } from "./schemas/Category";
import { articles } from "./articles";

const router = express.Router();

export interface Category {
  id?: string;
  name: string;
}

export const categories: Category[] = [
  { id: "11_catid", name: "Fiction" },
  { id: "22_catid", name: "Action" },
  { id: "33_catid", name: "Drama" },
  { id: "44_catid", name: "Romance" },
];

export function getCategories() {
  return categories;
}

router.get("/", (req, res) => {
  return res.send(categories);
});

router.get("/:id", (req, res) => {
  const category = categories.find((category) => category.id === req.params.id);
  if (!category)
    return res.status(404).send("The article with the given id was not found.");
  return res.send(category);
});

router.post("/", (req, res) => {
  //validera body
  const validation = validate(req.body);
  if (!validation.success) return res.status(400).send(validation.error.issues);

  //validera dubblett kategori namn

  const categoryName = categories.find(
    (category) => category.name === req.body.name
  );
  if (categoryName) {
    return res.status(400).send("A category with this name already exists.");
  }

  //skapa det nya kategori objektet

  const category = {
    id: Date.now().toString(),
    name: req.body.name,
  };

  //   if (!category)
  //     return res
  //       .status(400)
  //       .send("The category with the given id was not found.");

  //   };

  categories.push(category);

  //skicka ut till klienten

  return res.send(category);
});

router.delete("/:id", (req, res) => {
  const categoryId = req.params.id;

  // Kontrollera om kategorin finns
  const category = categories.find((category) => category.id === categoryId);
  if (!category) {
    return res
      .status(404)
      .send("The category with the given id was not found.");
  }

  // Kontrollera om några artiklar är kopplade till kategorin
  const connectedArticles = articles.some(
    (article) => article.category.id === categoryId
  );
  if (connectedArticles) {
    return res
      .status(400)
      .send(
        "The category cannot be deleted because it is associated with articles."
      );
  }

  // Ta bort kategorin
  const index = categories.indexOf(category);
  categories.splice(index, 1);

  // Skicka ut till klienten
  return res.send(category);
});

export default router;
