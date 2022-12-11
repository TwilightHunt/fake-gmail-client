<template>
  <div>
    <img :src="imagePath" alt="" />
    <h4>{{ user.firstname }} {{ user.lastname }}</h4>
    <div>{{ user.email }}</div>
  </div>
  <router-view></router-view>
</template>

<script>
import { useUserStore } from "../stores/user";
import { ref } from "vue";

export default {
  data() {
    return {
      imagePath: `http://localhost:8080/${this.user.profileImage}`,
    };
  },
  setup() {
    const userStore = useUserStore();
    const user = ref(userStore.user);
    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped></style>
