import { Router } from "express";
import { Signup } from "controllers/auth";

const authRouter: Router = Router();

authRouter.post("/signup", Signup);

export default authRouter;
