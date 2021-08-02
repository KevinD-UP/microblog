//Here put all request to database about user

//import database
import db from "../config/database.js";
import bcrypt from "bcrypt";

// Get All users
export const getUsers = (result) => {
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Insert Publication to Database
export const insertUser = (data, result) => {
    //console.log(data)
    const { fullname, email, nickname, password } = data;
    //verif regex

    /*if(!(/^([a-z0-9A-Z])$/.test(fullname) && /^\S+@\S+\.\S+$/.test(email) && /^([a-z0-9])$/.test(nickname) && /^(([a-z0-9A-Z]|.){6,})$/.test(password))){
        console.log("Wrong data");
    }
    else{*/
    const newUser = {
        name: fullname,
        email: email,
        nickname: nickname,
        password: password,
        avatar: "defaultAvatar.jpeg",
    };
    //Hash password
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //Save user
            db.query(
                `INSERT INTO user (name, email, nickname, password, avatar) 
                    VALUES ('${newUser.name}', '${newUser.email}', '${newUser.nickname}', '${newUser.password}', '${newUser.avatar}')`,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                        console.log("A new user has been registered");
                    }
                }
            );
        })
    );
    //}
};

// Check if the user exist in the database
export const connectUser = (data, result) => {
    //console.log(data);
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            //console.log(results);
            for (let x of results) {
                bcrypt.compare(
                    data.password,
                    x.password,
                    function(error, res) {
                        if (error) {
                            console.log(error);
                            result(error, null);
                        } else if (x.email == data.email && res) {
                            //console.log("connecte : " + data.email);
                            //USER.push({u:x,d:data});
                            const menuData = {
                                register: data.register,
                                login: data.login,
                                profil: data.profil,
                                deconnexion: data.deconnexion,
                                publier: data.publier,
                                abonnement: data.abonnement,
                            };
                            result(null, { user: x, menu: menuData });
                        }
                    }
                );
            }
        }
    });
};

export const updateUser = (data, result) => {
    /*console.log(data.idUser)
    console.log(data);*/
    db.query(
        `UPDATE user SET name = '${data.fullname}', email = '${data.email}', nickname = '${data.nickname}' WHERE idUser = ${data.idUser}`,
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    );
};