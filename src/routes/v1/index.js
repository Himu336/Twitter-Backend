import express from "express";
const router = express.Router();

import tweetRoutes from "./tweet-routes.js";
import userRoutes from "./user-routes.js";
import likeRoutes from "./like-routes.js";
import commentRoutes from "./comment-routes.js";

router.use('/tweets', tweetRoutes);
router.use('/user', userRoutes);
router.use('/like', likeRoutes);
router.use('/comment', commentRoutes);

export default router;