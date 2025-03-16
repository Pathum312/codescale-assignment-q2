import { User } from "../config";
import type Encryption from "../middleware/encryption";
import { Request, Response, NextFunction } from "express";

class UserController {
    private _encryption: Encryption;

    constructor(encryption: Encryption) {
        this._encryption = encryption;
    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.find(); // Fetching the list of users
        res.status(200).json(users);
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {};

    create = async (req: Request, res: Response, next: NextFunction) => {};

    update = async (req: Request, res: Response, next: NextFunction) => {};

    destroy = async (req: Request, res: Response, next: NextFunction) => {};
}

export default UserController;
