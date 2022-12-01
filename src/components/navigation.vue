<script setup>
import avatar from "./avatar.vue";
import burger from "./burger.vue";
</script>

<template>
  <div class="navigation">
    <burger />
    <a href="/profile">
      <avatar
        :src="'https://cdn.dribbble.com/users/1671018/screenshots/4403882/nuxt-design-color-clouds-1.png'"
      />
    </a>
  </div>
</template>

<style lang="scss">
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
