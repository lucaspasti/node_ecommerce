import { Request, Response } from "express";
import { prismaClient } from "index";
import { hashSync } from "bcrypt";

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
  res.json(user)
};
