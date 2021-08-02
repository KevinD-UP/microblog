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
        <div
            class="col-md-12 h-100 d-flex justify-content-center align-items-center"
        >
            <div class="col-md-8 rounded px-5 py-4 shadow bg-white text-left">
                <form id="setProfil-form" v-on:submit.prevent="save">
                    <div class="row">
                        <div class="col-12 form-group">
                            <label class="col-form-label col-form-label-lg"
                                >Full Name
                                <span class="text-danger">*</span></label
                            >
                            <input
                                type="text"
                                v-model.trim="$v.fullname.$model"
                                :class="{
                                    'is-invalid': validationStatus($v.fullname),
                                }"
                                class="form-control form-control-lg"
                            />
                            <div
                                v-if="!$v.fullname.required"
                                class="invalid-feedback"
                            >
                                The full name field is required.
                            </div>
                            <div
                                v-if="!$v.fullname.alphaWithSpace"
                                class="invalid-feedback"
                            >
                                The full name contain only alphabet characters
                                and space.
                            </div>
                        </div>
                        <div class="col-12 form-group">
                            <label class="col-form-label col-form-label-lg"
                                >Email <span class="text-danger">*</span></label
                            >
                            <input
                                type="email"
                                v-model.trim="$v.email.$model"
                                :class="{
                                    'is-invalid': validationStatus($v.email),
                                }"
                                class="form-control form-control-lg"
                            />
                            <div
                                v-if="!$v.email.required"
                                class="invalid-feedback"
                            >
                                The email field is required.
                            </div>
                            <div
                                v-if="!$v.email.email"
                                class="invalid-feedback"
                            >
                                The email is not valid.
                            </div>
                        </div>
                        <div class="col-12 form-group">
                            <label class="col-form-label col-form-label-lg"
                                >Nickname tag
                                <span class="text-danger">*</span></label
                            >
                            <input
                                type="text"
                                v-model.trim="$v.nickname.$model"
                                :class="{
                                    'is-invalid': validationStatus($v.nickname),
                                }"
                                class="form-control form-control-lg"
                            />
                            <div
                                v-if="!$v.nickname.required"
                                class="invalid-feedback"
                            >
                                The nickname field is required.
                            </div>
                            <div
                                v-if="!$v.nickname.alphaNum"
                                class="invalid-feedback"
                            >
                                The nickname should only contain alphabet
                                characters and number.
                            </div>
                        </div>
                        <div class="col-12 form-group text-center">
                            <button class="btn btn-vue btn-lg col-4">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { required, email, alphaNum } from "vuelidate/lib/validators";
import swal from "sweetalert";

const alphaWithSpace = (value) => /^[a-zA-Z ]*$/.test(value);

export default {
    data: function() {
        return {
            dataUser: { fullname: "", nickname: "", email: "", idUser: "" },
            id: "",
            fullname: "",
            email: "",
            nickname: "",
            feed: true,
            register: false,
            login: false,
            profil: false,
            deconnexion: true,
            publier: true,
            abonnement: true,
        };
    },

    validations: {
        fullname: { required, alphaWithSpace },
        email: { required, email },
        nickname: { required, alphaNum },
    },

    created() {
        this.getDataUser();
    },

    methods: {
        async getDataUser() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/dataUser"
                );
                //console.log("modifier profil");
                //console.log(response);
                //const menu = response.data[0].menu;

                this.dataUser.fullname = response.data[0].user.name;
                this.dataUser.nickname = response.data[0].user.nickname;
                this.dataUser.email = response.data[0].user.email;
                this.dataUser.idUser = response.data[0].user.idUser;

                this.id = response.data[0].user.idUser;

                this.fullname = this.dataUser.fullname;
                this.nickname = this.dataUser.nickname;
                this.email = this.dataUser.email;
            } catch (err) {
                console.log(err);
            }
        },
        resetData: function() {
            this.fullname = this.dataUser.fullname;
            this.email = this.dataUser.email;
            this.nickname = this.dataUser.nickname;
        },
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        save: async function() {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            await axios
                .put("http://localhost:5000/api/setProfil", {
                    idUser: this.id,
                    fullname: this.fullname,
                    email: this.email,
                    nickname: this.nickname,
                })
                .then(
                    (response) => {
                        console.log(response);
                        this.$router.push({ name: "Profil" });
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            swal("Bien joué", "Profil modifié avec succès ! ", "success");
            this.$v.$reset();
            this.resetData();
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
