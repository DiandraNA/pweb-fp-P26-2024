import { Request, Response } from "express";

interface BorrowRequest {
  userId: number;
  itemId: number;
  quantity: number;
}

const borrowRequests: BorrowRequest[] = [];

export const borrowItem = (req: Request, res: Response) => {
  const { userId, itemId, quantity } = req.body;

  if (!userId || !itemId || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBorrowRequest: BorrowRequest = {
    userId,
    itemId,
    quantity,
  };

  borrowRequests.push(newBorrowRequest);
  return res
    .status(201)
    .json({
      message: "Borrow request created successfully",
      request: newBorrowRequest,
    });
};
