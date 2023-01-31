<template>
  <div class="mail-mobile">
    <header class="mail__header">
      <div class="mail__header__items">
        <v-btn icon x-small elevation="0" class="action-btn" @click="goBack">
          <Icon
            name="backwards-arrow"
            class="mail__header__backwards-arrow backwards-arrow icon"
            color="#333333"
          />
        </v-btn>
        <div class="mail__header__btn-group btn-group">
          <v-btn icon elevation="0" class="action-btn btn-group__item">
            <icon name="archive" class="icon archive" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn btn-group__item">
            <icon name="bin" class="icon bin" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn btn-group__item">
            <icon name="mail" class="icon read" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn btn-group__item">
            <icon name="options" class="icon options" color="#333333" />
          </v-btn>
        </div>
      </div>
    </header>
    <main class="mail-body">
      <div class="mail-body__topic">
        <div class="mail-body__topic__text">
          {{ mail.topic || "< No topic >" }}
        </div>
        <icon
          name="star"
          class="icon mail-body__topic__icon star"
          color="#333333"
        />
      </div>
      <div class="mail-body__info">
        <avatar
          :src="`${baseURL}/${mail.senter.profileImage}`"
          :size="40"
          class="mail__senter"
        />
        <div class="mail-body__info__content">
          <div class="mail-body__mail-info mail-info">
            <span class="mail-info__senter"
              >{{ mail.senter.firstname }} {{ mail.senter.lastname }}</span
            >
            <span class="mail-info__date">{{ convertDate(mail.date) }}</span>
          </div>
          <a class="mail-info__receiver-button">to me</a>
          <v-icon color="#333333" class="mail-info__receiver-icon" size="15">
            mdi-chevron-down
          </v-icon>
        </div>
        <v-btn icon elevation="0" class="action-btn mail-body__info__btn">
          <icon name="reply" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn mail-body__info__btn">
          <icon name="options" class="icon" color="#333333" />
        </v-btn>
      </div>
      <div class="mail-body__message">
        <div v-if="mail.message" class="mail-body__message__content">
          {{ mail.message }}
        </div>
        <div v-else class="mail-body__message__empty-content">
          Place for your email content
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useMailsStore } from "../stores/mails";
import Icon from "../components/iconfont.vue";
import avatar from "./avatar.vue";

export default {
  data() {
    return {
      mail: {},
      baseURL: import.meta.env.VITE_BASE_URL,
    };
  },
  computed: {
    ...mapStores(useMailsStore, ["getMailById"]),
    mail() {
      return this.mailsStore.getMailById(this.$route.params.id);
    },
  },
  components: { Icon, avatar },
  methods: {
    goBack() {
      window.history.go(-1);
      return false;
    },
    convertDate(stringDate) {
      const date = new Date(stringDate);
      return date.toLocaleDateString("en-US");
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-mobile {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 20;
  border-radius: 0;
  padding: 5px 20px;
  background-color: #fff;
}
.mail__header {
  padding: 10px 0;
}
.mail__header__items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mail__header__btn-group {
  align-items: center;
}
.btn-group__item {
  &:not(:last-child) {
    margin-right: 10px;
  }
}
.read {
  margin-top: 5px;
}
.mail-body__topic {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mail-body__topic__text {
  font-size: 1.5em;
  flex: 0 1 90%;
  line-height: 150%;
  &::after {
    content: " Inbox";
    font-size: 0.7rem;
    font-weight: 800;
    background-color: #edeef0;
    padding: 2px 5px;
    border-radius: 15%;
    display: inline-block;
    vertical-align: middle;
    line-height: 150%;
  }
}
.v-btn.action-btn {
  width: 30px;
  height: 30px;
}
.mail__topic__label {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  background-color: #edeef0;
  padding: 2px 5px;
  border-radius: 15%;
}
.mail-body__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}
.mail-body__info__content {
  margin-right: auto;
  margin-left: 15px;
  line-height: 150%;
}
.mail-info__senter {
  font-weight: 800;
  margin-right: 10px;
}
.mail-info__date {
  opacity: 0.7;
  font-size: 0.875em;
}
.mail-info__receiver-button {
  margin-right: 10px;
  opacity: 0.7;
}
.mail-body__info__btn {
  &:not(:last-child) {
    margin-right: 7px;
  }
}
.mail-body__message {
  padding: 10px 0;
}

.mail-body__message__content {
  word-wrap: break-word;
}
.mail-body__message__empty-content {
  text-align: center;
  font-weight: 600;
  margin-top: 20%;
  font-size: 3rem;
  line-height: 120%;
  color: var(--side-menu-gray);
  opacity: 0.16;
}
</style>
