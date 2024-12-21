import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes";
import itemsRoutes from "./routes/itemsRoutes";
import borrowItemsRoutes from "./routes/borrowItemsRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/borrow-items", borrowItemsRoutes);

export default app;
