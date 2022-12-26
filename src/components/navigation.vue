<script setup>
import avatar from "./avatar.vue";
import burger from "./burger.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useUserStore());
</script>
<template>
  <div class="navigation">
    <burger style="margin: 0 17px 0 16px" />
    <img class="logo-img" src="../assets/logo.svg" alt="gmail" />
    <div class="search-input">
      <img
        class="serach-image"
        src="../assets/icons/navigation/search.svg"
        alt="search"
      />
      <input type="text" placeholder="Search mail" class="search" />
      <img
        class="options"
        src="../assets/icons/navigation/options.svg"
        alt="search"
      />
    </div>
    <div class="tools">
      <img src="../assets/icons/navigation/help.svg" alt="help" class="help" />
      <img
        src="../assets/icons/navigation/settings.svg"
        alt="settings"
        class="settings"
      />
      <img src="../assets/icons/navigation/apps.svg" alt="apps" class="apps" />
      <router-link to="/profile">
        <avatar :src="`http://localhost:8080/${user.profileImage}`" :size="2" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.navigation {
  padding: 8px;
  display: flex;
  align-items: center;
}
.search {
  background: #eef3fc;
  border-radius: 8px;
  width: 722px;
  padding: 15px 57px;
}
.search-input {
  position: relative;
}
.serach-image {
  position: absolute;
  top: 31.5%;
  left: 17px;
}
.options {
  position: absolute;
  top: 31.5%;
  right: 17px;
}
.tools {
  margin-left: auto;
  display: flex;
  column-gap: 20px;
}
.logo-img {
  cursor: pointer;
  margin-right: 95px;
}
</style>
