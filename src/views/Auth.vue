<script setup></script>

<template>
  <div class="auth">
    <input type="text" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <v-btn> Login </v-btn>
    <router-link to="register">Create a new account</router-link>
  </div>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
