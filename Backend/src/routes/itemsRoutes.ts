import { Request, Response, Router } from "express";

const router = Router();

router.get("/items", async (req: Request, res: Response): Promise<void> => {
  try {
    // Simulasi Operasi Asinkron
    const items = await fetchItems();
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Fungsi Contoh Asinkron
async function fetchItems(): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(["Item1", "Item2"]), 1000)
  );
}

export default router;
