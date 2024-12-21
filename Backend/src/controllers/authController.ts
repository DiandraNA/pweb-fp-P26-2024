import { Request, Response } from "express";
import { Role, User } from "../models/User";

const users: User[] = []; // Simulasi database sementara

export const register = (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const newUser: User = { username, password, role: role || Role.USER };
  users.push(newUser);

  return res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({ message: "Login successful", user });
};
