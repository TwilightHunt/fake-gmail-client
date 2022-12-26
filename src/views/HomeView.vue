<script setup>
import { useMailsStore } from "../stores/mails";
import { storeToRefs } from "pinia";
import EmailItem from "../components/email-item.vue";
import Navigation from "../components/navigation.vue";
import SideMenu from "../components/sideMenu/sideMenu.vue";
import Auth from "../views/Auth.vue";
import { useUserStore } from "../stores/user";
import Icon from "../components/iconfont.vue";

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
    <Navigation />
    <div class="content">
      <SideMenu />
      <div class="mails">
        <div class="mails__header">
          <div class="tools">
            <div class="selector">
              <input type="checkbox" name="" class="checkbox" />
              <icon
                name="unwrap-arrow"
                class="icon _checkbox"
                size="10"
                color="#5F6368"
              />
            </div>
            <div class="icon-button">
              <icon name="reply" class="icon" color="#5F6368" />
            </div>
            <div class="icon-button">
              <icon name="options" class="icon" color="#5F6368" />
            </div>
          </div>
        </div>
        <EmailItem v-for="mail in mails" :info="mail" :key="mail.id.value" />
      </div>
    </div>
  </div>
  <div v-else>
    <Auth />
  </div>
  <router-view></router-view>
</template>

<style lang="scss">
.content {
  display: flex;
  flex-grow: 1;
}
.mails {
  max-height: 100vh;
  padding: 57px 0px 10px 0px;
  overflow: auto;
  flex: 1;
  background-color: #fff;
}
.mails__header {
  width: 100vw;
  z-index: 10;
  padding: 14px 16px;
  position: fixed;
  box-shadow: 0 2px 2px rgba(76, 81, 92, 0.123);
  top: 60px;
  background-color: #fff;
}
.tools {
  align-items: center;
}
.selector {
  align-items: baseline;
  padding: 3px;
  border-radius: 10%;
  &:hover {
    background-color: #f1f1f1;
  }
}
.checkbox {
  display: inline-block;
  margin: 5px;
}
.icon-button {
  padding: 2px 4px;
  &:hover {
    background-color: #f1f1f1;
    border-radius: 50%;
  }
}
</style>
