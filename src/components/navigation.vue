<script setup>
import avatar from "./avatar.vue";
import burger from "./burger.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useUserStore());
</script>
<template>
  <div class="navigation">
    <burger />
    <router-link to="/profile">
      <avatar :src="`http://localhost:8080/${user.profileImage}`" :size="2" />
    </router-link>
  </div>
</template>

<style lang="scss">
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
