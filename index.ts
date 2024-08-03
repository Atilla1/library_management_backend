import express from "express";
import categories from "./routes/categories";
import articles from "./routes/articles";
import users from "./routes/users";
import auth from "./routes/auth";
import checkAuth from "./middleware/auth";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
//app.use(checkAuth);
app.use("/api/categories", categories);
app.use("/api/articles", articles);
app.use("/api/users", users);
app.use("/api/auth", auth);
const PORT = 5888;

app.listen(PORT, () => console.log("Listening on port " + PORT));

// async function createArticle() {
//   const article = await prisma.article.create({
//     data: {
//       title: "The Great Gatsby",
//       author: "F. Scott Fitzgerald",
//       nbrPages: 180,
//       runTimeMinute: 0,
//       type: "Book",
//       isBorrowable: true,
//       categoryId: "clzcdwjbi000011d0ahwz0gml",
//     },
//   });
//   console.log(article);
// }

// createArticle();

// async function updateArticleBorrowableStatus(
//   articleId: string,
//   newStatus: boolean
// ) {
//   try {
//     const updatedArticle = await prisma.article.update({
//       where: {
//         id: articleId,
//       },
//       data: {
//         isBorrowable: newStatus,
//       },
//     });
//     console.log(updatedArticle);
//   } catch (error) {
//     console.error("Error updating article:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Anropa funktionen med artikelns ID och det nya värdet för isBorrowable
// updateArticleBorrowableStatus("clzcgbdgx0001chjkshadgne4", false);
