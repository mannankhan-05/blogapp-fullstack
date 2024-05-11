<template>
  <v-sheet class="pa-12 custom-height">
    <v-card class="mx-auto px-6 py-8 custom-width" max-width="550">
      <h2 class="mb-3 font-weight-medium text-decoration-underline">
        Register
      </h2>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          prepend-inner-icon="mdi-account-circle"
          v-model="firstname"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="First Name"
          placeholder="Enter your firstName"
          clearable
        ></v-text-field>

        <v-text-field
          prepend-inner-icon="mdi-account-circle"
          v-model="lastname"
          :readonly="loading"
          :rules="[required]"
          label="Last Name"
          placeholder="Enter your lastName"
          clearable
        ></v-text-field>

        <v-text-field
          prepend-inner-icon="mdi-account-circle"
          v-model="age"
          type="number"
          :readonly="loading"
          :rules="[required]"
          label="Age"
          placeholder="Enter your age"
          clearable
        ></v-text-field>

        <v-text-field
          prepend-inner-icon="mdi-email-outline"
          v-model="email"
          type="email"
          :readonly="loading"
          :rules="[required]"
          label="Email"
          placeholder="Enter your email"
          clearable
          :error="!emailChecker"
        ></v-text-field>

        <v-text-field
          prepend-inner-icon="mdi-key"
          v-model="password"
          type="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          clearable
          :error="!passwordChecker"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
          @click="registerUser"
        >
          Sign Up
        </v-btn>
        <h4 class="mt-10 ml-9">
          If You Already Have An Account Then
          <router-link :to="{ name: 'home' }">
            <v-btn color="bg-blue-lighten-3 font-weight-bold" variant="tonal">
              SIGN IN
            </v-btn>
          </router-link>
          First
        </h4>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: false,
      loading: false,
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      password: "",
    };
  },

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
    async registerUser() {
      await axios.post("http://localhost:3000/registerUser", {
        firstname: this.firstname,
        lastname: this.lastname,
        age: this.age,
        email: this.email,
        password: this.password,
      });

      this.$router.push("/login");
    },
  },
  computed: {
    passwordChecker() {
      return this.password.length >= 8;
    },
    emailChecker() {
      return this.email.includes("@");
    },
  },
};
</script>

<style>
.custom-width {
  width: 50%;
  height: 100%;
  box-shadow: 0px 0px 10px 2px black;
}
</style>
