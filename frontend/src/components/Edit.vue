<template>
    <div class="container-fluid h-75">
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
            <router-link :to="{ name: 'Abonnement' }" class="btn" v-if="abonnement">
                Mes abonnements
            </router-link>
            <button class="btn" v-if="deconnexion" v-on:click="deco">
                Deconnexion
            </button>
        </nav>
        <div
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
                                Editer
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
            dataUser: { fullname: "", nickname: "", email: "", id: "" },
            post: "",
            feed: true,
            register: false,
            login: false,
            profil: true,
            deconnexion: true,
            publier: true,
            abonnement: true,
        };
    },

    validations: {
        post: { required },
    },

    created() {
        this.getPublicationById();
        this.getDataUser();
    },

    methods: {
        async getPublicationById() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/publications/${this.$route.params.id}`
                );
                console.log(response);
                this.publications = response.data;
                this.post = response.data[0].content;
            } catch (err) {
                console.log(err);
            }
        },
        resetData: function() {
            this.post = "";
        },
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        submit: async function(id) {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            await axios
                .put(`http://localhost:5000/api/publications/edit/${id}`, {
                    idPublication: this.publications[0].idPublication,
                    post: this.post,
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
            swal("Bien joué !", "Publication édité !", "success");
            this.$v.$reset();
            this.resetData();
        },
        async getDataUser() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/dataUser"
                );
                console.log(response);
                const menu = response.data[0].menu;

                this.dataUser.fullname = response.data[0].user.name;
                this.dataUser.nickname = response.data[0].user.nickname;
                this.dataUser.email = response.data[0].user.email;
                this.dataUser.id = response.data[0].user.idUser;
                console.log("publier");
                console.log(menu);

                this.register = menu.register;
                this.login = menu.login;
                this.deconnexion = menu.deconnexion;
                this.abonnement = menu.abonnement;
                this.profil = menu.profil;
                this.publier = menu.publier;
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
