import express from "express";
import jwt from "jsonwebtoken";
import { authenticateToken, getUserData } from "../middleware/authMiddleware";

const router = express.Router();

const dummyUsers = [
  { id: 1, username: 'adminP26', password: 'admin26', role: 'admin' },
  { id: 2, username: 'user', password: 'user26', role: 'user' },
];

// Rute login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = dummyUsers.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "s3cr37_p1");
  res.status(200).json({ token, username: user.username, role: user.role });
});

// Rute registrasi
router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  const newUser = { id: dummyUsers.length + 1, username, password, role };
  dummyUsers.push(newUser);
  res.status(201).json(newUser);
});

// Rute untuk mendapatkan informasi pengguna
router.get("/user", authenticateToken, getUserData);

export default router;