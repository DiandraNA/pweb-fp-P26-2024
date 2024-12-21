import { Request, Response, Router } from "express";

const router = Router();

router.post("/borrow", (req: Request, res: Response): void => {
  res.send("Item borrowed successfully");
});

export default router;
