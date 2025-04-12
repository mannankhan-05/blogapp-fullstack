<template>
  <v-sheet class="pa-12 custom-height" color="background">
    <v-card
      class="mx-auto px-6 py-8 custom-width"
      max-width="550"
      elevation="0"
      :style="{ boxShadow: 'var(--shadow-card)' }"
      rounded="lg"
    >
      <h2 class="text-h4 mb-6 font-weight-medium text-center text-primary">
        Create Account
      </h2>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              prepend-inner-icon="mdi-account-circle"
              v-model="firstname"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="First Name"
              placeholder="Enter your firstName"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              prepend-inner-icon="mdi-account-circle"
              v-model="lastname"
              :readonly="loading"
              :rules="[required]"
              label="Last Name"
              placeholder="Enter your lastName"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          prepend-inner-icon="mdi-account-circle"
          v-model="age"
          type="number"
          :readonly="loading"
          :rules="[required]"
          label="Age"
          placeholder="Enter your age"
          variant="outlined"
          color="primary"
          bg-color="surface"
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
          variant="outlined"
          color="primary"
          bg-color="surface"
          clearable
          :error="!emailChecker"
          :error-messages="
            !emailChecker ? 'Please enter a valid email address' : ''
          "
        ></v-text-field>

        <v-text-field
          prepend-inner-icon="mdi-key"
          v-model="password"
          type="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          variant="outlined"
          color="primary"
          bg-color="surface"
          clearable
          :error="!passwordChecker"
          :error-messages="
            !passwordChecker ? 'Password must be at least 8 characters' : ''
          "
        ></v-text-field>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
          block
          class="mt-6 text-white"
          :style="{ boxShadow: 'var(--shadow-button)' }"
          @click="registerUser"
        >
          Create Account
        </v-btn>

        <div class="mt-8 text-center">
          <p class="text-body-1 mb-4">Already have an account?</p>
          <router-link :to="{ name: 'login' }">
            <v-btn
              color="secondary"
              variant="tonal"
              class="font-weight-bold"
              :style="{ transition: 'var(--transition-default)' }"
            >
              SIGN IN
            </v-btn>
          </router-link>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import axiosInstance from "../apis/axiosInstance.js";

export default {
  data() {
    return {
      form: false,
      loading: false,
      firstname: "",
      lastname: "",
      age: 0,
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
      await axiosInstance.post("/registerUser", {
        firstName: this.firstname,
        lastName: this.lastname,
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
  width: 100%;
  max-width: 550px;
  transition: var(--transition-default);
}

@media (max-width: 600px) {
  .custom-width {
    width: 90%;
  }
}
</style>
