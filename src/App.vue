<script setup>
import { useMailsStore } from "./stores/mails";
import { storeToRefs } from "pinia";
import EmailItem from "./components/email-item.vue";
import navigation from "./components/navigation.vue";

const { mails } = storeToRefs(useMailsStore());
const { fetchMails } = useMailsStore();

fetchMails();
</script>

<template>
  <div v-if="true">
    <navigation />
    <EmailItem v-for="mail in mails" :info="mail" :key="mail.id.value" />
  </div>
  <div v-else>
    <v-btn to="/login"> Login </v-btn>
    <v-btn to="/register"> Register </v-btn>
  </div>
</template>

<style scoped></style>
