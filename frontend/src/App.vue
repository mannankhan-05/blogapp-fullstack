<template>
  <v-app>
    <!-- binding this loggedIn value to the MyNavbar component -->
    <MyNavbar />
    <v-main>
      <!-- when the user is successfully loggedIn the loggedIn value is set to true -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MyNavbar from "./views/MyNavbar.vue";

export default {
  name: "App",
  components: {
    MyNavbar,
  },

  data: () => ({
    // loggedIn: false,
  }),
};
</script>
