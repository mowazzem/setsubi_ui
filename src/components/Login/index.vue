<template>
  <v-card class="d-inline-block mx-auto card-verticale-center" outlined>
    <v-img
      src="http://www.kpha-ky.org/portals/72/NEON/Member-Login-Button.png"
      height="50px"
    >
    </v-img>
    <v-form class="login-form" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail Or Username"
        required
        prepend-inner-icon="mdi-account"
      ></v-text-field>

      <v-text-field
        v-model="pass"
        :rules="passRules"
        label="Password"
        required
        type="password"
        prepend-inner-icon="mdi-lock"
      ></v-text-field>

      <v-btn :disabled="!valid" color="purple" class="btn" @click="login" outlined>
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    pass: "",
    passRules: [v => !!v || "Password is required"],
    email: "",
    emailRules: [v => !!v || "E-mail is required"]
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        alert("login successfull");
      }
    }
  }
};
</script>

<style scoped>
.card-verticale-center {
  padding: 10px;
  margin: auto;
  width: 280px;
  height: 280px;
}
.btn {
  margin-top: 10px;
  float: right;
  width: 100%;
}
.login-form {
  margin-top: 25px;
}
</style>
