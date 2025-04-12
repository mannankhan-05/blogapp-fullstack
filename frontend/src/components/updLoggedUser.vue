<template>
  <div>
    <v-btn
      v-if="isLoggedIn"
      color="secondary"
      variant="elevated"
      class="text-white"
      block
      :style="{ boxShadow: 'var(--shadow-button)' }"
      @click="openEditDialog = !openEditDialog"
    >
      <v-icon class="mr-2">mdi-account-edit</v-icon>
      Edit User Info
    </v-btn>

    <v-dialog
      v-model="openEditDialog"
      width="600"
      class="custom-height"
      :style="{ boxShadow: 'var(--shadow-dialog)' }"
    >
      <template v-slot:default="{}">
        <v-card
          class="pa-4"
          rounded="lg"
          elevation="0"
          :style="{ boxShadow: 'var(--shadow-card)' }"
        >
          <v-card-title class="text-h5 text-primary font-weight-bold mb-4">
            Update Profile Information
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="$store.state.myfirstname"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="First Name"
              placeholder="Enter your firstname"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="$store.state.mylastname"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Last Name"
              placeholder="Enter your lastname"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="$store.state.myage"
              type="number"
              :readonly="loading"
              :rules="[required]"
              label="Age"
              placeholder="Enter your age"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Cancel"
              variant="outlined"
              color="primary"
              class="font-weight-medium"
              @click="openEditDialog = !openEditDialog"
            ></v-btn>
            <v-btn
              text="Update"
              variant="elevated"
              color="primary"
              class="font-weight-medium text-white ml-2"
              :style="{ boxShadow: 'var(--shadow-button)' }"
              @click="updateUserInfo"
            >
              <v-icon class="mr-1">mdi-content-save</v-icon>
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import axiosInstance from "../apis/axiosInstance.js";

export default {
  data() {
    return {
      openEditDialog: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    async updateUserInfo() {
      await axiosInstance.put(
        `/updateUser/${this.$store.state.loggedInUserId}`,
        {
          firstname: this.$store.state.myfirstname,
          lastname: this.$store.state.mylastname,
          age: this.$store.state.myage,
        }
      );
      this.openEditDialog = false;
    },
  },
};
</script>

<style>
.v-dialog > .v-card {
  border-radius: var(--radius-large);
  overflow: hidden;
}
</style>
