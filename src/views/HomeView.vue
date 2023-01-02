<script setup>
import { useMailsStore } from "../stores/mails";
import { storeToRefs } from "pinia";
import EmailItem from "../components/email-item.vue";
import Navigation from "../components/navigation.vue";
import SideMenu from "../components/sideMenu/sideMenu.vue";
import Auth from "../views/Auth.vue";
import { useUserStore } from "../stores/user";
import Icon from "../components/iconfont.vue";
import Tabs from "../components/tabs.vue";

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

function checkIcon(icon) {
  const oldClass = icon.classList[0];
  const newClass = oldClass.replace("-outline", "");
  icon.classList.replace(oldClass, newClass);
  icon.style.color = "#1374e9";
}

function uncheckIcon(icon) {
  const oldClass = icon.classList[0];
  const newClass = `${oldClass}-outline`;
  icon.classList.replace(oldClass, newClass);
  icon.style.color = "#5F6368";
}

function switchIcons(event) {
  const element = event.path[2];
  if (element.classList.contains("filter")) {
    const icons = element.querySelectorAll("input");

    icons.forEach((element) => {
      const icon = element.parentNode.querySelector("i");
      const oldClass = icon.classList[0];

      if (element.checked) {
        checkIcon(icon);
      } else if (!oldClass.includes("-outline")) {
        uncheckIcon(icon);
      }
    });
  }
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
        <div class="filter" @click="switchIcons">
          <div class="tab">
            <input
              type="radio"
              checked
              name="css-tabs"
              id="tab-1"
              class="tab-switch"
            />
            <label for="tab-1" class="tab-label">
              <v-icon color="#1374e9" class="tab-icon"> mdi-inbox </v-icon>
              <span>Primary</span>
            </label>
            <div class="tab-content"></div>
          </div>
          <div class="tab">
            <input type="radio" name="css-tabs" id="tab-2" class="tab-switch" />
            <label for="tab-2" class="tab-label">
              <v-icon color="#5F6368" class="tab-icon">
                mdi-label-outline
              </v-icon>
              <span>Promotions</span>
            </label>
          </div>
          <div class="tab">
            <input type="radio" name="css-tabs" id="tab-3" class="tab-switch" />
            <label for="tab-3" class="tab-label">
              <v-icon color="#5F6368" class="tab-icon">
                mdi-account-multiple-outline
              </v-icon>
              <span>Socials</span>
            </label>
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
  border-radius: 16px;
  overflow-x: hidden;
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
  max-height: 84vh;
  overflow-y: auto;
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
  line-height: 160%;
}
.day {
  font-weight: 800;
  font-size: 2.125em;
}
.weekday {
  font-size: 1.125em;
}
.filter {
  display: flex;
}
.tabs::before,
.tabs::after {
  content: "";
  display: table;
}
.tabs::after {
  clear: both;
}
.tab-switch {
  display: none;
}
:deep(.tab-label) {
  position: relative;
  display: block;
  width: 252px;
  font-weight: 600;
  background-color: #fff;
  cursor: pointer;
  top: 0;
  transition: all 0.25s;
  padding: 16px;
  &:hover {
    background-color: #ebecef;
  }
}
.tab-switch:checked + .tab-label {
  color: #1374e9;
  &::after {
    content: "";
    position: absolute;
    background-color: #1374e9;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 3px;
    border-radius: 3px;
  }
}
.tab-icon {
  margin-right: 16px;
}
</style>
