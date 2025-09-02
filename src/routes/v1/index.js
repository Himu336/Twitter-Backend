import express from "express";
const router = express.Router();

import tweetRoutes from "./tweet-routes.js";
import userRoutes from "./user-routes.js";

router.use('/tweets', tweetRoutes);
router.use('/user', userRoutes);

export default router;