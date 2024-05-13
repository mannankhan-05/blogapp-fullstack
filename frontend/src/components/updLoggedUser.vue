<template>
  <div>
    <v-btn
      v-if="isLoggedIn"
      color="blue-darken-4"
      variant="tonal"
      @click="openEditDialog = !openEditDialog"
    >
      <v-icon class="pr-3">mdi-account-edit</v-icon>
      Edit User Info</v-btn
    >

    <v-dialog v-model="openEditDialog" width="600" class="custom-height">
      <template v-slot:default="{}">
        <v-card>
          <h2 class="text-decoration-underline ma-5">Update Users Info</h2>
          <v-card-text>
            <v-text-field
              v-model="$store.state.myfirstname"
              prepend-inner-icon=""
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="FirstName"
              placeholder="re-enter your firstname"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="$store.state.mylastname"
              prepend-inner-icon=""
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="LastName"
              placeholder="re-enter your lastname"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="$store.state.myage"
              prepend-inner-icon=""
              type="number"
              :readonly="loading"
              :rules="[required]"
              label="Age"
              placeholder="re-enter your age"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="$store.state.myemail"
              prepend-inner-icon=""
              type="email"
              :readonly="loading"
              :rules="[required]"
              label="Email"
              placeholder="re-enter your email"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="$store.state.mypassword"
              prepend-inner-icon=""
              type="password"
              :readonly="loading"
              :rules="[required]"
              label="Password"
              placeholder="re-enter your password"
              clearable
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Close"
              variant="tonal"
              class="font-weight-bold"
              @click="openEditDialog = !openEditDialog"
            ></v-btn>
            <v-btn
              text="Update"
              variant="tonal"
              class="font-weight-bold"
              color="blue-darken-4"
              @click="updateUserInfo"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

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
      await axios.put(
        `http://localhost:3000/updateUser/${this.$store.state.loggedInUserId}`,
        {
          firstname: this.$store.state.myfirstname,
          lastname: this.$store.state.mylastname,
          age: this.$store.state.myage,
          email: this.$store.state.myemail,
          password: this.$store.state.mypassword,
        }
      );
      this.openEditDialog = false;
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    },
  },
};
</script>

<style></style>
