import { Request, Response } from "express";
import { prismaClient } from "index";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "utils/secrets";

export const Signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  user = await prismaClient.user.create({
    data: { name, email, password: hashSync(password, 10) },
  });
  res.json(user);
};
export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (user) {
    return res.status(400).json({ message: "User does not exists" });
  }
  if (!compareSync(password, user.password)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ user, token });
};
