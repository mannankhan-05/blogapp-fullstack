<template>
  <v-sheet class="pa-12 custom-height">
    <v-card class="mx-auto px-6 py-8 custom-width" max-width="550">
      <h2 class="mb-3 font-weight-medium text-decoration-underline">Login</h2>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          type="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          placeholder="Enter your email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          clearable
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
          @click="loginUser"
        >
          Sign In
        </v-btn>
        <h4 class="mt-10 ml-9">
          If You Don't Already Have An Account Then
          <router-link :to="{ name: 'register' }">
            <v-btn color="bg-blue-lighten-3 font-weight-bold" variant="tonal">
              SIGN UP
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
  name: "loginPage",

  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
    async loginUser() {
      await axios.post("http://localhost:3000/loginUser", {
        email: this.email,
        password: this.password,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style>
.custom-height {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.custom-width {
  width: 50%;
  height: 45%;
  box-shadow: 0px 0px 10px 2px black;
}
</style>
