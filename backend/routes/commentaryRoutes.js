// import express
import express from "express";

// import function from controller
import {
    showCommentairesById,
    showCommentaireById,
    deleteCommentaire,
    likeCommentaire,
    dislikeCommentaire,
    showEditedCommentaire,
    showPostedCommentaire,
} from "../controllers/commentaire.js";

// init express router
const router = express.Router();

// Get all comment by publication id
router.get("/api/commentaires/:id", showCommentairesById);

// Get single comment by id
router.get("/api/commentaire/:id", showCommentaireById);

// Delete comment
router.delete("/api/commentaires/:id", deleteCommentaire);

// Like comment
router.put("/api/commentaires/like/:id", likeCommentaire);

// Dislike comment
router.put("/api/commentaires/dislike/:id", dislikeCommentaire);

// Edit comment
router.put("/api/commentaires/edit/:id", showEditedCommentaire);

// Post comment
router.post("/api/commentaires/post", showPostedCommentaire);

// export default router
export default router;