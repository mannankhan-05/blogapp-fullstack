<template>
  <div>
    <v-app-bar
      elevation="0"
      :style="{ boxShadow: 'var(--shadow-navbar)' }"
      color="primary"
      class="text-white"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white" />
      <div>
        <router-link :to="{ name: 'home' }">
          <v-icon
            icon="mdi-shield-home"
            class="icon ml-5"
            color="white"
            size="32"
          ></v-icon>
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <div v-if="isLoggedIn" class="user-name pa-3 ma-3">
        {{ $store.state.f1 }}{{ $store.state.f2 }}
      </div>
      <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">
        <v-btn color="white" variant="text" class="font-weight-medium">
          <v-icon class="mr-2">mdi-login</v-icon>
          Login
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'register' }" v-if="!isLoggedIn">
        <v-btn
          color="secondary"
          variant="flat"
          class="ml-4 mr-2 text-white font-weight-medium"
        >
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Register
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      v-if="drawer && isLoggedIn"
      app
      class="drawer"
      width="320"
      temporary
      :style="{ boxShadow: 'var(--shadow-dialog)' }"
    >
      <v-list>
        <v-list-item class="py-4 bg-primary-lighten-5">
          <v-list-item-title class="text-h6 font-weight-bold text-primary mb-2">
            My Account
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isLoggedIn">
          <v-list-item-content>
            <div class="mb-3 mt-3">
              <updLoggedUser />
            </div>
            <div class="mt-4">
              <addBlog />
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-divider v-if="isLoggedIn" class="my-4"></v-divider>

        <v-list-item>
          <v-list-item-content>
            <p v-if="!isLoggedIn" class="text-center text-body-1 my-4">
              You first need to sign in!
            </p>
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
import updLoggedUser from "./updLoggedUser.vue";

export default {
  name: "MyNav",
  components: {
    logoutButton,
    addBlog,
    updLoggedUser,
  },
  data() {
    return {
      drawer: false,
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
  color: var(--text-primary);
  text-decoration: underline;
  font-size: 23px;
}

.user-name {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: bold;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-circle);
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}

.drawer {
  background-color: var(--surface);
}

.icon {
  transition: var(--transition-default);
}

.icon:hover {
  transform: scale(1.1);
}
</style>
