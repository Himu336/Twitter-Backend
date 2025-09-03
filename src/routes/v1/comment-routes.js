import express from "express";
import { CommentController } from "../../controllers/comment-controller.js";
import { authenticate } from "../../middlewares/auth-request-middleware.js";

const router = express.Router();

// POST /api/v1/comments
router.post('/', authenticate, CommentController.createComment);

// GET /api/v1/comments?onModel=Tweet&commentable=<tweetId>
router.get('/', authenticate, CommentController.getCommentsForModel);

// GET /api/v1/comments/:id
router.get('/:id', authenticate, CommentController.getComment);

// DELETE /api/v1/comments/:id
router.delete('/:id', authenticate, CommentController.deleteComment);

export default router;
