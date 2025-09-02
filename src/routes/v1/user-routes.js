import express from "express";

import { UserController } from "../../controllers/user-controller.js";
const router = express.Router();

router.post('/signup',
    UserController.signUp
);

router.post('/login',
    UserController.signIn
);

export default router;