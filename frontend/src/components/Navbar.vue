<template>
  <v-app-bar>
    <v-app-bar-nav-icon />
    <v-app-bar-title class="font-weight-bold custom-font-color"
      >Blog@myBlogs</v-app-bar-title
    >
    <router-link :to="{ name: 'login' }">
      <v-btn color="blue-darken-4" variant="tonal">
        <v-icon class="pr-3">mdi-login</v-icon>
        Login</v-btn
      >
    </router-link>
    <v-btn color="blue-darken-4" variant="tonal" class="ml-4">
      <v-icon class="pr-3">mdi-account-plus</v-icon>
      Register</v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  name: "MyNav",
};
</script>

<style>
.custom-font-color {
  color: black;
  text-decoration: underline;
  font-size: 23px;
}
</style>
