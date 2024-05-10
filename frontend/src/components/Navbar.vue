<template>
  <v-app-bar>
    <v-app-bar-nav-icon />
    <v-app-bar-title class="font-weight-bold custom-font-color"
      >Blog@myBlogs</v-app-bar-title
    >
    <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">
      <v-btn color="blue-darken-4" variant="tonal">
        <v-icon class="pr-3">mdi-login</v-icon>
        Login</v-btn
      >
    </router-link>

    <router-link :to="{ name: 'register' }" v-if="!isLoggedIn">
      <v-btn color="blue-darken-4" variant="tonal" class="ml-4 mr-2">
        <v-icon class="pr-3">mdi-account-plus</v-icon>
        Register</v-btn
      >
    </router-link>

    <router-link :to="{ name: 'login' }" v-if="isLoggedIn">
      <v-btn color="blue-darken-4" variant="tonal">
        <v-icon class="pr-3">mdi-plus-box</v-icon>
        Create New Blog</v-btn
      >
    </router-link>

    <router-link :to="{ name: 'home' }">
      <v-btn
        @click="logout"
        color="blue-darken-4 ml-4 mr-2"
        variant="tonal"
        v-if="isLoggedIn"
      >
        <v-icon class="pr-3">mdi-logout</v-icon>
        Logout</v-btn
      >
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "MyNav",
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout"); // dispatch the logout action.
    },
  },
};
</script>

<style>
.custom-font-color {
  color: black;
  text-decoration: underline;
  font-size: 23px;
}
</style>
