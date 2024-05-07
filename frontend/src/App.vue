<template>
  <v-app>
    <MyNavbar />
    <v-main>
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
    //
  }),
};
</script>
