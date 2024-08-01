import express from "express";

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

router.get("/", (req, res) => {
  return res.send(categories);
});

export default router;
