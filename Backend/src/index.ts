import express from "express";
import "./db-connection";
import authRouter from "./routes/authRoute";
import itemRouter from "./routes/item.route";
import borrowRouter from "./routes/borrow.route";
import userRouter from "./routes/userRoutes"; // Import user routes
import cors from "cors";
  
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  })
);

app.get("/", (_, res) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).send({
    status: "success",
    date: currentTime,
  });
});

app.use("/items", itemRouter);
app.use("/auth", authRouter);
app.use("/borrow", borrowRouter);
app.use("/api", userRouter); // Use user routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});