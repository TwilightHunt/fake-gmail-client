<!-- <script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const data = reactive({
  email: "",
  password: "",
});

async function onLogin() {
  
}
</script> -->

<script>
import { useUserStore } from "../stores/user";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onLogin() {
      const { login } = useUserStore();
      await login(this.email, this.password);
    },
  },
};
</script>

<template>
  <div class="auth">
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div>{{ email }} - {{ password }}</div>
    <v-btn @click="onLogin"> Login </v-btn>
    <router-link to="register">Create a new account</router-link>
  </div>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
