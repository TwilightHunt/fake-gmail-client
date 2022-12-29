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

function getCurrentDate() {
  const currentDate = new Date();

  return {
    day: currentDate.getDate(),
    weekday: currentDate.toLocaleString("en-us", { weekday: "short" }),
  };
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
              <v-btn elevation="0" class="checkbox-btn">
                <input type="checkbox" name="" class="checkbox-input" />
              </v-btn>
              <v-btn elevation="0" class="checkbox-icon-btn">
                <icon
                  name="unwrap-arrow"
                  class="icon _checkbox"
                  size="10"
                  color="#5F6368"
                />
              </v-btn>
            </div>
            <v-btn icon elevation="0" class="action-btn">
              <v-icon color="#5F6368">mdi-reload</v-icon>
            </v-btn>
            <v-btn icon elevation="0" class="action-btn">
              <icon name="options" class="icon" color="#5F6368" />
            </v-btn>
          </div>
          <div class="right-side">
            <v-btn elevation="0" class="counter-text"> 1-50 of 9999 </v-btn>
            <v-btn icon elevation="0" class="action-btn _disabled">
              <v-icon color="#5F6368"> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn icon elevation="0" class="action-btn">
              <v-icon color="#5F6368">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="mails__body">
          <EmailItem v-for="mail in mails" :info="mail" :key="mail.id.value" />
        </div>
      </div>
      <div class="right-side">
        <div class="calendar">
          <div class="day">{{ getCurrentDate().day }}</div>
          <div class="weekday">{{ getCurrentDate().weekday }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Auth />
  </div>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
@import "../assets/styles/mixins/scrollbar.scss";
@include scrollbar;
.content {
  display: flex;
  flex-grow: 1;
}
.mails {
  flex: 1;
  background-color: #fff;
}
.mails__header {
  z-index: 10;
  padding: 0 5px;
  position: sticky;
  box-shadow: 0 2px 2px rgba(76, 81, 92, 0.123);
  background-color: #fff;
  top: 0;
  display: flex;
  justify-content: space-between;
}
.mails__body {
  max-height: 100vh;
  overflow: auto;
}
.tools {
  display: flex;
  align-items: center;
}
.selector {
  align-items: baseline;
  padding: 3px;
  border-radius: 10%;
}
.checkbox {
  display: inline-block;
  margin: 5px;
}
.icon-button {
  padding: 2px 4px;
}
.v-btn {
  &.counter-text {
    color: #5f6368;
    font-size: 0.75em;
    font-family: "Google Sans";
  }
  &.action-btn {
    width: 40px;
    height: 40px;
    &._disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  &.checkbox-icon-btn {
    padding: 0;
    min-width: 10px;
    width: 20px;
    height: 40px;
  }
  &.checkbox-btn {
    padding: 0;
    min-width: 10px;
    width: 35px;
    height: 40px;
  }
}
.right-side {
  padding: 10px 2px;
  min-width: 60px;
}
.calendar {
  text-align: center;
  color: #202124;
}
.day {
  font-weight: 800;
  font-size: 2.125em;
}
.weekday {
  font-size: 1.125em;
}
</style>
