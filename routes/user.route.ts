import express, { Request, Response, NextFunction } from "express";
import Encryption from "../middleware/encryption";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = new UserController(new Encryption());

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.get(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
