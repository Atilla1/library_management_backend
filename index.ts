import express from "express";
import categories from "./routes/categories";
import articles from "./routes/articles";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/articles", articles);
const PORT = 5888;

app.listen(PORT, () => console.log("Listening on port " + PORT));
