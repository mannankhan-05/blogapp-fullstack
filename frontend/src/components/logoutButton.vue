<template>
  <div class="text-center pa-4" v-if="isLoggedIn">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="black-darken-4"
          variant="tonal"
          class="ml-2 mr-2"
          block
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
</template>

<script>
export default {
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
