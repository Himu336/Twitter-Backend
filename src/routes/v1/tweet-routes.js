import express from "express";

import { createTweet, getTweets, getTweet, destroyTweet } from "../../controllers/tweet-controller.js";
const router = express.Router();

// POST /api/v1/tweets
router.post('/', 
    createTweet
);

// GET /api/v1/tweets
router.get('/', 
    getTweets
);

// GET /api/v1/tweets/:id
router.get('/:id', 
    getTweet
);

// DELETE /api/v1/tweets/:id
router.delete('/:id', 
    destroyTweet
);


export default router;