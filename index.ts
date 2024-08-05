import express from "express";
import categories from "./routes/categories";
import articles from "./routes/articles";
import users from "./routes/users";
import auth from "./routes/auth";
//import checkAuth from "./middleware/auth";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5888;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-frontend-glyt.onrender.com",
    ],
  })
);
app.use(express.json());
//app.use(checkAuth);
app.use("/api/categories", categories);
app.use("/api/articles", articles);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(PORT, () => console.log("Listening on port " + PORT));
