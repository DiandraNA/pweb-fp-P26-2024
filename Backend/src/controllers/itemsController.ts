import { Request, Response } from "express";

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

const items: Item[] = [];

export const addItem = (req: Request, res: Response) => {
  const { name, description, quantity } = req.body;

  if (!name || !description || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newItem: Item = {
    id: items.length + 1,
    name,
    description,
    quantity,
  };

  items.push(newItem);
  return res
    .status(201)
    .json({ message: "Item added successfully", item: newItem });
};

export const getItems = (_req: Request, res: Response) => {
  return res.status(200).json(items);
};
