import { Router } from "express";
import { Login, Signup } from "controllers/auth";

const authRouter: Router = Router();

authRouter.post("/signup", Signup);
authRouter.post("/login", Login);

export default authRouter;
