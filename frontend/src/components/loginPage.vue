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
        Login
      </h2>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          prepend-inner-icon="mdi-email-outline"
          v-model="email"
          type="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-4"
          label="Email"
          placeholder="Enter your email"
          variant="outlined"
          color="primary"
          bg-color="surface"
          clearable
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
          @click="loginUser"
        >
          Sign In
        </v-btn>

        <div class="mt-10 text-center">
          <p class="text-body-1 mb-4">Don't have an account yet?</p>
          <router-link :to="{ name: 'register' }">
            <v-btn
              color="secondary"
              variant="tonal"
              class="font-weight-bold"
              :style="{ transition: 'var(--transition-default)' }"
            >
              CREATE ACCOUNT
            </v-btn>
          </router-link>
        </div>

        <div
          v-if="errorMessage"
          class="bg-error-lighten-4 text-error pa-4 rounded mt-6 text-center font-weight-medium"
        >
          {{ errorMessage }}
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: "loginPage",

  data: () => ({
    form: false,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return; // If the form is not submitted, return early.
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required"; // Validation rule: Field is required.
    },
    async loginUser() {
      const { email, password } = this; // Destructure email and password from component data.
      // Dispatch the 'login' action with email, password, and router data.
      this.$store.dispatch("login", { email, password, router: this.$router });
    },
  },

  computed: {
    email: {
      get() {
        return this.$store.state.email;
      },
      set(newValue) {
        this.$store.commit("setEmail", newValue);
      },
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(newValue) {
        this.$store.commit("setPassword", newValue);
      },
    },
    errorMessage() {
      return this.$store.state.errorMessage;
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
  background-color: var(--background) !important;
}

.custom-width {
  width: 100%;
  max-width: 450px;
  transition: var(--transition-default);
}

@media (max-width: 600px) {
  .custom-width {
    width: 90%;
  }
}
</style>
