<script>
/* --> Components */
import Compose from "../components/compose.vue";
import Icon from "../components/iconfont.vue";
import Mail from "../components/mail.vue";
import EmailItem from "../components/email-item.vue";
import Navigation from "../components/navigation.vue";
import SideMenu from "../components/sideMenu/sideMenu.vue";
import Empty from "../components/empty.vue";

/* --> Views */
import Auth from "../views/Auth.vue";

/*  --> Pinia */
import { mapStores, mapState } from "pinia";
import { useUserStore } from "../stores/user";
import { useMailsStore } from "../stores/mails";

export default {
  data() {
    return {
      isComposeActive: false,
    };
  },
  computed: {
    ...mapStores(useUserStore, useMailsStore),
    ...mapState(useUserStore, ["isAuth"]),
    ...mapState(useMailsStore, {
      receivedMails: (store) => store.getSortedReceivedMails,
      sentMails: (store) => store.getSortedSentMails,
    }),
  },
  methods: {
    changeComposeVisibility() {
      this.isComposeActive = !this.isComposeActive;
    },
    getCurrentDate() {
      const currentDate = new Date();

      return {
        day: currentDate.getDate(),
        weekday: currentDate.toLocaleString("en-us", { weekday: "short" }),
      };
    },
    changeIcon(icon, newClass, color) {
      const oldClass = icon.classList[0];
      icon.classList.replace(oldClass, newClass);
      icon.style.color = color;
    },
    checkTabActivity() {
      const tabs = document.querySelectorAll(".tab-switch");

      tabs.forEach((el) => {
        const icon = el.parentNode.querySelector("i");

        if (el.checked) {
          const newClass = icon.classList[0].replace("-outline", "");
          this.changeIcon(icon, newClass, "#1374e9");
          el.classList.add("_checked");
        } else if (!el.checked && !icon.classList[0].includes("-outline")) {
          const newClass = `${icon.classList[0]}-outline`;
          this.changeIcon(icon, newClass, "#5F6368");
          el.classList.remove("_checked");
        }
      });
    },
    hideSideMenu() {
      document.querySelector(".side-menu").classList.toggle("_closed");
    },
  },
  components: {
    Compose,
    Icon,
    EmailItem,
    Navigation,
    SideMenu,
    Empty,
    Auth,
    Mail,
  },
};
</script>

<template>
  <div v-if="isAuth" class="wrapper">
    <Navigation @hideSideMenu="hideSideMenu" />
    <div class="content">
      <SideMenu @changeComposeVisibility="changeComposeVisibility" />
      <Mail v-if="$route.params.id" />
      <div v-else class="mails">
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
          <div class="mails-header__navigation">
            <v-btn elevation="0" class="counter-text"> 1-50 of 9999 </v-btn>
            <v-btn icon elevation="0" class="action-btn _disabled">
              <v-icon color="#5F6368"> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn icon elevation="0" class="action-btn">
              <v-icon color="#5F6368">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
        <div v-if="$route.params.section === 'inbox'" class="mails__body">
          <div></div>
          <div class="filter" @click="checkTabActivity">
            <div class="tab">
              <input
                type="radio"
                checked
                name="css-tabs"
                id="tab-1"
                class="tab-switch _checked"
              />
              <label for="tab-1" class="tab-label">
                <v-icon color="#1374e9" class="tab-icon"> mdi-inbox </v-icon>
                <span class="tab-title">Primary</span>
              </label>
              <div class="tab-content">
                <div v-if="receivedMails.length > 0">
                  <EmailItem v-for="mail in receivedMails" :info="mail" />
                </div>
                <Empty v-else />
              </div>
            </div>
            <div class="tab">
              <input
                type="radio"
                name="css-tabs"
                id="tab-2"
                class="tab-switch"
              />
              <label for="tab-2" class="tab-label">
                <v-icon color="#5F6368" class="tab-icon">
                  mdi-label-outline
                </v-icon>
                <span class="tab-title">Promotions</span>
              </label>
              <div class="tab-content">
                <Empty />
              </div>
            </div>
            <div class="tab">
              <input
                type="radio"
                name="css-tabs"
                id="tab-3"
                class="tab-switch"
              />
              <label for="tab-3" class="tab-label">
                <v-icon color="#5F6368" class="tab-icon">
                  mdi-account-multiple-outline
                </v-icon>
                <span class="tab-title">Socials</span>
              </label>
              <div class="tab-content">
                <Empty />
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.params.section === 'sent'" class="mails__body">
          <div v-if="sentMails.length > 0">
            <EmailItem v-for="mail in sentMails" :info="mail" />
          </div>
          <Empty v-else />
        </div>
      </div>
      <div class="right-side">
        <div class="calendar">
          <div class="day">{{ getCurrentDate().day }}</div>
          <div class="weekday">{{ getCurrentDate().weekday }}</div>
        </div>
      </div>
      <Compose
        @changeComposeVisibility="changeComposeVisibility"
        v-if="isComposeActive"
      />
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
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
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
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
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
    color: var(--items-gray-color);
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
  position: relative;
  background: #fff;
}
.tab {
  float: left;
}
.tab-switch {
  display: none;
}
.tab-title {
  font-size: 1em;
  text-overflow: ellipsis;
}
.tab-label {
  position: relative;
  display: block;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 1em;
  width: 15vw;
  top: 0;
  &:hover {
    background-color: #ebecef;
  }
}
.tab-switch._checked + .tab-label {
  color: var(--light-blue-color);
  &::after {
    content: "";
    position: absolute;
    background-color: var(--light-blue-color);
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
.tab-content {
  width: 100%;
  position: absolute;
  opacity: 0;
  z-index: 1;
  left: 0;
  background: #fff;
}
.tab-switch._checked + label + .tab-content {
  z-index: 2;
  opacity: 1;
}
@media (max-width: 1129px) {
  .right-side,
  .mails__header {
    display: none;
  }
  .tab-label {
    width: 33.33vw;
  }
  .mails {
    border-radius: 0;
    height: calc(100vh - 64px);
  }
  .mails__body {
    height: calc(100vh - 64px);
  }
}
@media (max-width: 440px) {
  .tab-icon {
    display: none;
  }
}
</style>
