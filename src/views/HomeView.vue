<script setup>
import { useMailsStore } from "../stores/mails";
import { storeToRefs } from "pinia";
import EmailItem from "../components/email-item.vue";
import navigation from "../components/navigation.vue";
import sideMenu from "../components/sideMenu.vue";
import Auth from "../views/Auth.vue";
import { useUserStore } from "../stores/user";

const { mails } = storeToRefs(useMailsStore());
const { fetchMails } = useMailsStore();
const { checkAuth } = useUserStore();

const { isAuth } = storeToRefs(useUserStore());

if (localStorage.getItem("access_token")) {
  checkAuth();
  fetchMails();
}
</script>

<template>
  <div v-if="isAuth">
    <navigation />
    <div class="content">
      <sideMenu />
      <div class="mails">
        <EmailItem v-for="mail in mails" :info="mail" :key="mail.id.value" />
      </div>
    </div>
  </div>
  <div v-else>
    <Auth />
  </div>
  <router-view></router-view>
</template>

<style>
.content {
  display: flex;
  flex-grow: 1;
  min-width: 90vw;
}
.mails {
  flex: 1;
}
</style>
