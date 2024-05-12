<template>
  <div>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title class="font-weight-bold custom-font-color"
        >Blog@myBlogs</v-app-bar-title
      >

      <div class="user-name pa-3 ma-3">
        {{ $store.state.f1 }}{{ $store.state.f2 }}
      </div>

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
    </v-app-bar>

    <v-navigation-drawer v-if="drawer" app class="drawer" width="320">
      <v-list>
        <v-list-item v-if="isLoggedIn">
          <v-list-item-content>
            <addBlog />
          </v-list-item-content>
        </v-list-item>

        <v-divider v-if="isLoggedIn"></v-divider>

        <v-list-item>
          <v-list-item-content>
            <p v-if="!isLoggedIn">You first need to sign in!</p>
            <logoutButton v-else />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import logoutButton from "./logoutButton.vue";
import addBlog from "./addBlog.vue";

export default {
  name: "MyNav",
  components: {
    logoutButton,
    addBlog,
  },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
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

.user-name {
  background: rgb(58, 61, 63);
  color: white;
  font-weight: bold;
  width: 60px;
  height: 35px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}

.drawer {
  box-shadow: 0 0 5px 2px black;
}
</style>
