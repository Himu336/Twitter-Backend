import express from "express";
const router = express.Router();

import tweetRoutes from "./tweet-routes.js";
import userRoutes from "./user-routes.js";
import likeRoutes from "./like-routes.js";

router.use('/tweets', tweetRoutes);
router.use('/user', userRoutes);
router.use('/like', likeRoutes);

export default router;