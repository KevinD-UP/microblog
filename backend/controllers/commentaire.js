import {
    getCommentairesById,
    getCommentaireById,
    deleteCommentaireById,
    likeCommentaireById,
    dislikeCommentaireById,
    editCommentaire,
    postCommentaire,
} from "../models/commentaryModel.js";

export const showCommentairesById = (req, res) => {
    getCommentairesById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showCommentaireById = (req, res) => {
    getCommentaireById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Delete Commentaire
export const deleteCommentaire = (req, res) => {
    const id = req.params.id;
    deleteCommentaireById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Like Commentaire
export const likeCommentaire = (req, res) => {
    const id = req.params.id;
    likeCommentaireById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Dislike Commentaire
export const dislikeCommentaire = (req, res) => {
    const id = req.params.id;
    dislikeCommentaireById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showEditedCommentaire = (req, res) => {
    const data = req.body;
    editCommentaire(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showPostedCommentaire = (req, res) => {
    const data = req.body;
    postCommentaire(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};