import express from "express";

import { LikeController } from "../../controllers/like-controller.js";
const router = express.Router();

router.post('/toggle',
    LikeController.toggleLike
);

export default router;