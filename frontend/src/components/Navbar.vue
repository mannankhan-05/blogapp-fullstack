<template>
  <v-app-bar>
    <v-app-bar-nav-icon />
    <v-app-bar-title class="font-weight-bold custom-font-color"
      >Blog@myBlogs</v-app-bar-title
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
