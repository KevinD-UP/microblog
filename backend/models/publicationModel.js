//Here put all request to database about publication

//import database
import db from "../config/database.js";

// Get All Publications
export const getPublications = (result) => {
    //produit cartésien
    db.query(
        "SELECT * FROM publication, user WHERE publication.author=user.idUser ORDER BY date DESC",
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Get Single publication
export const getPublicationById = (id, result) => {
    db.query(
        "SELECT * FROM publication, user WHERE idPublication = ? AND publication.author=user.idUser", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Delete Publication to Database
export const deletePublicationById = (id, result) => {
    db.query(
        "DELETE FROM publication WHERE idPublication = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Like publication by id
export const likePublicationById = (id, result) => {
    db.query(
        "UPDATE publication SET nbLike = nbLike + 1 WHERE idPublication = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Like publication by id
export const dislikePublicationById = (id, result) => {
    db.query(
        "UPDATE publication SET nbDislike = nbDislike + 1 WHERE idPublication = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

export const newPublication = (data, result) => {
    db.query(
        `INSERT INTO publication (date, content, nbLike, nbDislike, author) 
        VALUES ( NOW(), "${data.post}", ${0}, ${0}, ${data.idUser})`,
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

export const editPublication = (data, result) => {
    db.query(
        `UPDATE publication SET content = "${data.post}" WHERE idPublication = ${data.idPublication}`,
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

export const repostPublication = (data, result) => {
    const author = data.idUser;
    const publication = data.data;
    const post = "@" + publication.nickname + " " + publication.content;
    db.query(`INSERT INTO publication (date, content, nbLike, nbDislike, author) VALUES (NOW(), "${post}", ${0}, ${0}, ${author})`, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}