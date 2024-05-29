<template>
  <v-container class="pa-3">
    <v-layout>
      <router-link :to="{ name: 'users', id: $store.state.loggedInUserId }">
        <v-btn variant="outlined">Back</v-btn>
      </router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
