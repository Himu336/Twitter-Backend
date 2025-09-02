import express from "express";

import { createTweet, getTweets, getTweet, destroyTweet } from "../../controllers/tweet-controller.js";
import { authenticate } from "../../middlewares/auth-request-middleware.js"
const router = express.Router();

// POST /api/v1/tweets
router.post('/',
    authenticate, 
    createTweet
);

// GET /api/v1/tweets
router.get('/', 
    authenticate,
    getTweets
);

// GET /api/v1/tweets/:id
router.get('/:id', 
    authenticate,
    getTweet
);

// DELETE /api/v1/tweets/:id
router.delete('/:id',
    authenticate, 
    destroyTweet
);


export default router;