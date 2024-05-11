<template>
  <v-app-bar>
    <v-app-bar-nav-icon />
    <v-app-bar-title class="font-weight-bold custom-font-color"
      >Blog@myBlogs</v-app-bar-title
    >

    <div class="user-name mr-6" v-if="isLoggedIn">
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

    <router-link :to="{ name: 'createBlog' }" v-if="isLoggedIn">
      <v-btn color="blue-darken-4" variant="tonal">
        <v-icon class="pr-3">mdi-plus-box</v-icon>
        Create New Blog</v-btn
      >
    </router-link>

    <div class="text-center pa-4" v-if="isLoggedIn">
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="blue-darken-4"
            variant="tonal"
            class="ml-2 mr-2"
          >
            Logout
          </v-btn>
        </template>

        <v-card
          prepend-icon="mdi-logout"
          text="Are U sure You Want To Logout From Your Account ?"
          title="Logout"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn
              @click="dialog = false"
              variant="tonal"
              color="black-darken-2"
              class="font-weight-medium"
            >
              Cancel
            </v-btn>
            <router-link :to="{ name: 'home' }">
              <v-btn
                @click="logout"
                variant="tonal"
                color="blue-darken-4"
                class="ml-2 font-weight-medium"
              >
                Logout
              </v-btn>
            </router-link>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "MyNav",
  data() {
    return {
      dialog: false,
    };
  },
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
</style>
