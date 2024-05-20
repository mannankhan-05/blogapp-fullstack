<template>
  <v-app>
    <!-- binding this loggedIn value to the MyNavbar component -->
    <MyNavbar />
    <v-main>
      <!-- when the user is successfully loggedIn the loggedIn value is set to true -->
      <router-view />
    </v-main>
    <MyFooter />
  </v-app>
</template>

<script>
import MyNavbar from "./views/MyNavbar.vue";
import MyFooter from "./components/footer.vue";

export default {
  name: "App",
  components: {
    MyNavbar,
    MyFooter,
  },

  data: () => ({
    // loggedIn: false,
  }),
};
</script>
