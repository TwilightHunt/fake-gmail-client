<script setup>
import { useMailsStore } from "../stores/mails";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import EmailItem from "../components/email-item.vue";
import navigation from "../components/navigation.vue";
import Auth from "../views/Auth.vue";

const { mails } = storeToRefs(useMailsStore());
const { user } = storeToRefs(useUserStore());
const { fetchMails } = useMailsStore();
const { login } = useUserStore();

fetchMails();
login();
</script>

<template>
  <div v-if="user.email">
    <navigation />
    <div>{{ user }}</div>
    <EmailItem v-for="mail in mails" :info="mail" :key="mail.id.value" />
  </div>
  <div v-else>
    <Auth />
  </div>
  <router-view></router-view>
</template>
