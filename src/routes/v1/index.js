import express from "express";
const router = express.Router();

import tweetRoutes from "./tweet-routes.js";

router.use('/tweets', tweetRoutes);

export default router;