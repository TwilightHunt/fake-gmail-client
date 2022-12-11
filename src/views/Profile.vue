<template>
  <div>
    <img :src="imagePath" alt="" />
    <h4>{{ user.firstname }} {{ user.lastname }}</h4>
    <div>{{ user.email }}</div>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useUserStore());
const imagePath = `http://localhost:8080/${user.profileImage}`;
</script>

<style lang="scss" scoped></style>
