// Import function from publication Model
import {
    getPublicationById,
    getPublications,
    deletePublicationById,
    likePublicationById,
    dislikePublicationById,
    newPublication,
    editPublication,
    repostPublication
} from "../models/publicationModel.js";

// Get All Publication
export const showPublications = (req, res) => {
    getPublications((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showPublicationById = (req, res) => {
    getPublicationById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Delete publication
export const deletePublication = (req, res) => {
    const id = req.params.id;
    deletePublicationById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Like publication
export const likePublication = (req, res) => {
    const id = req.params.id;
    likePublicationById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Dislike publication
export const dislikePublication = (req, res) => {
    const id = req.params.id;
    dislikePublicationById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const addPublication = (req, res) => {
    const data = req.body;
    newPublication(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showEditedPublication = (req, res) => {
    const data = req.body;
    editPublication(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showRepostPublication = (req, res) => {
    const data = req.body;
    repostPublication(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}