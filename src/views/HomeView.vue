<script setup>
import { useMailsStore } from "../stores/mails";
import { storeToRefs } from "pinia";
import EmailItem from "../components/email-item.vue";
import navigation from "../components/navigation.vue";
import Auth from "../views/Auth.vue";
import { useUserStore } from "../stores/user";

const { mails } = storeToRefs(useMailsStore());
const { fetchMails } = useMailsStore();
const { checkAuth } = useUserStore();
const { logout } = useUserStore();

const { user } = storeToRefs(useUserStore());
const { isAuth } = storeToRefs(useUserStore());

if (localStorage.getItem("access_token")) {
  checkAuth();
  fetchMails();
}
</script>

<template>
  <div v-if="isAuth">
    <navigation />
    <v-btn @click="getUsers">get users</v-btn>
    <v-btn @click="logout">Logout</v-btn>
    <EmailItem v-for="mail in mails" :info="mail" :key="mail.id.value" />
  </div>
  <div v-else>
    <Auth />
  </div>
  <router-view></router-view>
</template>
