import express from "express";

import { LikeController } from "../../controllers/like-controller.js";
import { authenticate } from "../../middlewares/auth-request-middleware.js"
const router = express.Router();

router.post('/toggle',
    authenticate,
    LikeController.toggleLike
);

export default router;