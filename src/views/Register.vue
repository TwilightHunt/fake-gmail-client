<template>
  <div class="register">
    <input type="text" placeholder="firstname" v-model="firstname" />
    <input type="text" placeholder="lastname" v-model="lastname" />
    <input type="text" placeholder="email" v-model="email" />
    <input type="text" placeholder="password" v-model="password" />
    <v-btn @click="onRegister">Create</v-btn>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  data() {
    return {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    };
  },
  methods: {
    async onRegister() {
      try {
        const { register } = useUserStore();
        await register(
          this.email,
          this.firstname,
          this.lastname,
          this.password
        );
      } catch (error) {
        console.log(error);
      }
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
