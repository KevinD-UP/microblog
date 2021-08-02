<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light rounded bg-success">
            <a class="navbar-brand" href="#">Microblog</a>
            <router-link :to="{ name: 'Index' }" class="btn" v-if="feed">
                Fil d'actualité
            </router-link>
            <router-link :to="{ name: 'Register' }" class="btn" v-if="register">
                Register
            </router-link>
            <router-link :to="{ name: 'Login' }" class="btn" v-if="login">
                Login
            </router-link>
            <router-link :to="{ name: 'Profil' }" class="btn" v-if="profil">
                Profil
            </router-link>
            <router-link :to="{ name: 'Publier' }" class="btn" v-if="publier">
                Publier un post
            </router-link>
            <router-link
                :to="{ name: 'Abonnement' }"
                class="btn"
                v-if="abonnement"
            >
                Mes abonnements
            </router-link>
            <button class="btn" v-if="deconnexion" v-on:click="deco">
                Deconnexion
            </button>
        </nav>
        <br /><br />
        <div
            v-for="item in publications"
            :key="item.idPublication"
            class="border border-success rounded"
        >
            <div class="border rounded px-5 py-4 shadow bg-white text-left">
                <img
                    :src="require('../images/' + item.avatar)"
                    width="100px"
                    height="110px"
                    alt="profilepicture"
                />
                {{ item.nickname }} - {{ item.content }} <br />
                {{ item.date }} <br />
                Like: {{ item.nbLike }} - Dislike: {{ item.nbDislike }}
            </div>
        </div>
        <div
            v-for="item in commentaires"
            :key="item.idCommentaire"
            class="border rounded"
        >
            <div class="border rounded px-5 py-4 shadow bg-white text-left">
                <img
                    :src="require('../images/' + item.avatar)"
                    width="100px"
                    height="100px"
                    alt="profilepicture"
                />
                {{ item.nickname }} - {{ item.content }} <br />
                {{ item.date }} <br />
                Like: {{ item.nbLike }} - Dislike: {{ item.nbDislike }}
                <br />
                <router-link
                    :to="{
                        name: 'EditComment',
                        params: { id: item.idCommentaire },
                    }"
                    class="btn btn-success"
                    v-if="item.nickname === dataUser.nickname"
                >
                    Edit
                </router-link>
                <button
                    class="btn btn-danger"
                    @click="deleteCommentaire(item.idCommentaire)"
                    v-if="item.nickname === dataUser.nickname"
                >
                    Supprimer
                </button>
                <button
                    class="btn btn-primary"
                    @click="likeCommentaire(item.idCommentaire)"
                    v-if="publier"
                >
                    Like
                </button>
                <button
                    class="btn btn-primary"
                    @click="dislikeCommentaire(item.idCommentaire)"
                    v-if="publier"
                >
                    Dislike
                </button>
            </div>
        </div>
        <br />
        <div
            v-if="dataUser.nickname.length != 0"
            class="col-md-12 h-100 d-flex justify-content-center align-items-center"
        >
            <div class="col-md-8 rounded px-5 py-4 shadow bg-white text-left">
                <form id="publier" v-on:submit.prevent="submit">
                    <div class="row">
                        <div class="col-12 form-group">
                            <label class="col-form-label col-form-label-lg"
                                >Commentaire :
                                <span class="text-danger">*</span></label
                            >
                            <input
                                type="text"
                                v-model.trim="$v.post.$model"
                                :class="{
                                    'is-invalid': validationStatus($v.post),
                                }"
                                class="form-control form-control-lg"
                                value="post"
                            />
                            <div
                                v-if="!$v.post.required"
                                class="invalid-feedback"
                            >
                                Champs vide
                            </div>
                        </div>

                        <div class="col-12 form-group text-center">
                            <button class="btn btn-vue btn-lg col-4">
                                Commenter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";
import swal from "sweetalert";

export default {
    data() {
        return {
            publications: [],
            commentaires: [],
            dataUser: { fullname: "", nickname: "", email: "", idUser: "" },
            post: "",
            timer: "",
            feed: true,
            register: true,
            login: true,
            profil: false,
            deconnexion: false,
            publier: false,
            abonnement: false,
        };
    },
    validations: {
        post: { required },
    },
    created() {
        this.getDataUser();
        this.getPublicationById();
        this.getCommentaires();
        this.timer = setInterval(this.getCommentaires, 10000);
    },

    methods: {
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        resetData() {
            this.post = "";
        },
        submit: async function() {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            console.log(this.dataUser);
            await axios
                .post("http://localhost:5000/api/commentaires/post", {
                    idUser: this.id,
                    post: this.post,
                    idPublication: this.$route.params.id,
                })
                .then(
                    (response) => {
                        console.log(response);
                        this.getCommentaires();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            swal("Bien joué !", "Commentaire posté !", "success");
            this.$v.$reset();
            this.resetData();
        },

        cleanTheDate(dateStr) {
            return new Date(dateStr)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "");
        },

        async getPublicationById() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/publications/${this.$route.params.id}`
                );
                console.log(response);
                this.publications = response.data;
                this.publications.forEach(
                    (publication) =>
                        (publication.date = this.cleanTheDate(publication.date))
                );
            } catch (err) {
                console.log(err);
            }
        },

        async getCommentaires() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/commentaires/${this.$route.params.id}`
                );
                console.log(response);
                this.commentaires = response.data;
                this.commentaires.forEach(
                    (commentaire) =>
                        (commentaire.date = this.cleanTheDate(commentaire.date))
                );
            } catch (err) {
                console.log(err);
            }
        },

        //Delete Commentaire
        async deleteCommentaire(id) {
            swal({
                title: "En êtes vous sur ?",
                text:
                    "Une fois supprimé, vous ne pourrez pas récupérer votre merveilleux commentaire !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    try {
                        axios
                            .delete(
                                `http://localhost:5000/api/commentaires/${id}`
                            )
                            .then((response) => {
                                console.log(response);
                                this.getCommentaires();
                            });
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    swal("Votre commentaire est encore vivant !");
                }
            });
        },

        async likeCommentaire(id) {
            try {
                axios.put(`http://localhost:5000/api/Commentaires/like/${id}`);
                this.getCommentaires();
            } catch (err) {
                console.log(err);
            }
        },

        async dislikeCommentaire(id) {
            try {
                axios.put(
                    `http://localhost:5000/api/Commentaires/dislike/${id}`
                );
                this.getCommentaires();
            } catch (err) {
                console.log(err);
            }
        },

        async getDataUser() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/dataUser"
                );
                console.log("modifier profil");
                console.log(response);
                const menu = response.data[0].menu;

                this.dataUser.fullname = response.data[0].user.name;
                this.dataUser.nickname = response.data[0].user.nickname;
                this.dataUser.email = response.data[0].user.email;
                this.dataUser.idUser = response.data[0].user.idUser;

                this.id = response.data[0].user.idUser;

                this.fullname = this.dataUser.fullname;
                this.nickname = this.dataUser.nickname;
                this.email = this.dataUser.email;

                this.profil = menu.profil;
                this.deconnexion = menu.deconnexion;
                this.publier = menu.publier;
                this.abonnement = menu.abonnement;
                this.register = menu.register;
                this.login = menu.login;
            } catch (err) {
                console.log(err);
            }
        },

        async deco() {
            console.log("deconnexion");
            console.log(this.dataUser);
            try {
                await axios
                    .post("http://localhost:5000/api/dataUser", {
                        id: this.id,
                        email: this.dataUser.email,
                        name: this.dataUser.fullname,
                        nickname: this.dataUser.nickname,
                    })
                    .then(
                        (response) => {
                            console.log(response);
                            this.$router.push({ name: "Index" });
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
