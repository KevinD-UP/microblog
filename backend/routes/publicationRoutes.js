// import express
import express from "express";

// import function from controller
import {
    showPublications,
    showPublicationById,
    deletePublication,
    likePublication,
    dislikePublication,
    addPublication,
    showEditedPublication,
    showRepostPublication
} from "../controllers/publication.js";

// init express router
const router = express.Router();

// Get All publications
router.get("/api/publications", showPublications);

// Get single publication
router.get("/api/publications/:id", showPublicationById);

// Delete publication
router.delete("/api/publications/:id", deletePublication);

// Like publication
router.put("/api/publications/like/:id", likePublication);

// Dislike publication
router.put("/api/publications/dislike/:id", dislikePublication);

// update publication content
router.put("/api/publications/edit/:id", showEditedPublication);

// add publication
router.post("/api/publier", addPublication);

// repost publication
router.post("/api/publications/repost", showRepostPublication);

// export default router
export default router;