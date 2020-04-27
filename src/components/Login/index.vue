<template>
  <v-card class="d-inline-block mx-auto card-verticale-center " outlined raised>
    <v-snackbar verticale v-model="snackbar" top :timeout=1500>
      {{ notification }}
    </v-snackbar>
    <v-toolbar color="green">
      <span>Login</span>
    </v-toolbar>
    <v-progress-linear :active="loading" indeterminate> </v-progress-linear>
    <v-card flat class="card-form">
      <v-form class="login-form" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          class="mb-2"
          v-model="username"
          :rules="usernameRules"
          label="E-mail Or Username"
          required
          outlined
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <div></div>
        <v-text-field
          class="mb-2"
          v-model="pass"
          :rules="passRules"
          label="Password"
          required
          type="password"
          outlined
          prepend-inner-icon="mdi-lock"
        ></v-text-field>

        <v-btn :disabled="!valid" color="primary" class="btn" @click="login">
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";
import Cookies from "js-cookie";
//import Vue from "vue";

export default {
  data: () => ({
    snackbar: false,
    notification: "",
    loading: false,
    valid: true,
    pass: "",
    passRules: [v => !!v || "Password is required"],
    username: "",
    usernameRules: [v => !!v || "E-mail is required"]
  }),
  computed: {
    ...mapGetters(["getToken"]),
    tokenValidity() {
      return this.getToken;
    }
  },

  methods: {
    ...mapActions(["submitLogin", "setUserInfo", "fetchSetsubiCategories"]),
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.submitLogin({
          username: this.username,
          password: this.pass
        })
          .then(response => {
            let jwtToken = response.token;
            let jwtPayload = jwtToken.split(".")[1];
            let jwtDcdd = atob(jwtPayload);
            let userInfo = JSON.parse(jwtDcdd);
            this.setUserInfo(userInfo);
           // console.log(userInfo);
            let dat = new Date(parseInt(userInfo.exp) * 1000);
            Cookies.set("token", response.token, {
              expires: dat
            });
            Cookies.set("user-info", userInfo, {
              expires: dat
            });
            window.axios.defaults.headers.Token = jwtToken;
            if (jwtToken) {
              router.push({ path: "/" });
              this.loading = false;
            }
          })
          .catch(error => {
            console.log(error);
            this.snackbar = true;
            this.loading = false;
            this.notification = "Could not login";
          });
      }
    }
  },
  mounted() {
    /*if (this.getToken != undefined && this.getToken.length != 0) {
      router.push({
        path: "/dashboard"
      });
    }*/
  }
};
</script>

<style scoped>
@media (min-width: 1025px) {
  .card-verticale-center {
    margin-top: 100px;
    width: 25%;
  }
}
@media (min-width: 601px) and (max-width: 1024px) {
  .card-verticale-center {
    margin-top: 100px;
    width: 50%;
  }
}
@media (max-width: 600px) {
  .card-verticale-center {
    margin-top: 100px;
    width: 80%;
  }
}
.card-form {
  margin: auto;
  padding: 10px;
}
.btn {
  float: right;
  width: 100%;
  margin-bottom: 10px;
}
.login-form {
  margin-top: 25px;
}
</style>
