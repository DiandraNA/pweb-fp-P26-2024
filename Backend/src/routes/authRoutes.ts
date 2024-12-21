import { Request, Response, Router } from "express";

const router = Router();

// Corrected Handler
router.post("/login", (req: Request, res: Response): void => {
  res.send("Login successful");
});

export default router;
