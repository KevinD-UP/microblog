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
                <form id="signup-form" v-on:submit.prevent="submit">
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
                        <div class="col-12 form-group">
                            <label class="col-form-label col-form-label-lg"
                                >Password
                                <span class="text-danger">*</span></label
                            >
                            <input
                                type="password"
                                v-model.trim="$v.password.$model"
                                :class="{
                                    'is-invalid': validationStatus($v.password),
                                }"
                                class="form-control form-control-lg"
                            />
                            <div
                                v-if="!$v.password.required"
                                class="invalid-feedback"
                            >
                                The password field is required.
                            </div>
                            <div
                                v-if="!$v.password.minLength"
                                class="invalid-feedback"
                            >
                                You must have at least
                                {{ $v.password.$params.minLength.min }} letters.
                            </div>
                        </div>
                        <div class="col-12 form-group text-center">
                            <button class="btn btn-vue btn-lg col-4">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { required, email, minLength, alphaNum } from "vuelidate/lib/validators";
import axios from "axios";
import swal from "sweetalert";

const alphaWithSpace = (value) => /^[a-zA-Z ]*$/.test(value);

export default {
    name: "SignupForm",
    data: function() {
        return {
            fullname: "",
            email: "",
            nickname: "",
            password: "",
            feed: true,
            register: false,
            login: true,
            profil: false,
            deconnexion: false,
            publier: false,
            abonnement: false,
        };
    },
    validations: {
        fullname: { required, alphaWithSpace },
        email: { required, email },
        nickname: { required, alphaNum },
        password: { required, minLength: minLength(6) },
    },
    methods: {
        resetData: function() {
            this.fullname = "";
            this.email = "";
            this.nickname = "";
            this.password = "";
        },
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        submit: async function() {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            await axios
                .post("http://localhost:5000/api/register", {
                    fullname: this.fullname,
                    email: this.email,
                    nickname: this.nickname,
                    password: this.password,
                })
                .then(
                    (response) => {
                        console.log(response);
                        this.$router.push({ name: "Login" });
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            swal("Bien joué !", "Vous vous êtes bien enregistrés !", "success");
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
<style>
.btn-vue {
    background: #53b985;
    color: #31485d;
    font-weight: bold;
}
</style>
