<template>
  <div v-if="width >= 800" class="mail">
    <header class="mail__header">
      <div class="tools">
        <v-btn
          icon
          elevation="0"
          class="action-btn"
          style="margin-right: 36px"
          @click="goBack"
        >
          <Icon name="backwards-arrow" class="icon" color="#333333" />
        </v-btn>
        <div class="btn-group">
          <v-btn icon elevation="0" class="action-btn">
            <icon name="archive" class="icon" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn">
            <icon name="spam" class="icon" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn">
            <icon name="bin" class="icon" color="#333333" />
          </v-btn>
        </div>
        <div class="btn-group">
          <v-btn icon elevation="0" class="action-btn">
            <icon name="mail" class="icon" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn">
            <icon name="clocks" class="icon" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn">
            <icon name="shedule" class="icon" color="#333333" />
          </v-btn>
        </div>
        <div class="btn-group">
          <v-btn icon elevation="0" class="action-btn">
            <icon name="drive" class="icon" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn">
            <icon name="label" class="icon" color="#333333" />
          </v-btn>
          <v-btn icon elevation="0" class="action-btn">
            <icon name="options" class="icon" color="#333333" />
          </v-btn>
        </div>
      </div>
      <div class="pages">
        <v-btn icon elevation="0" class="action-btn _disabled">
          <v-icon color="#5F6368"> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn icon elevation="0" class="action-btn _disabled">
          <v-icon color="#5F6368">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </header>
    <div class="mail__title">
      <div>
        <span>{{ mail.topic || "< No topic >" }}</span>
        <icon name="label" class="icon" color="#333333" />
      </div>
      <div>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="print" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="open-in" class="icon" color="#333333" />
        </v-btn>
      </div>
    </div>
    <div class="mail__info">
      <avatar
        :src="`${baseURL}/${mail.senter.profileImage}`"
        :size="40"
        class="mail__senter"
      />
      <div class="senter">
        <span class="name"
          >{{ mail.senter.firstname }} {{ mail.senter.lastname }}</span
        >
        <span class="email"> {{ `<${mail.senter.email}>` }} </span>
        <a href="" class="unsubscribe">Unsubscribe</a>
        <div class="receiver">
          <a class="receiver__buttin">to me</a>
          <icon
            name="unwrap-arrow"
            size="10"
            class="receiver__icon"
            color="#333333"
          />
        </div>
      </div>
      <div class="right-side">
        <span class="date">{{ convertDate(mail.date) }}</span>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="star" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="reply" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="options" class="icon" color="#333333" />
        </v-btn>
      </div>
    </div>
    <div v-if="mail.message" class="mail__message">{{ mail.message }}</div>
    <div v-else class="mail__empty-content">Place for your email content</div>
  </div>
  <MailMobile v-else />
</template>

<script>
import Icon from "../components/iconfont.vue";
import { mapStores } from "pinia";
import { useMailsStore } from "../stores/mails";
import avatar from "./avatar.vue";
import MailMobile from "./mail-mobile.vue";

export default {
  data() {
    return {
      mail: {},
      width: 0,
      baseURL: import.meta.env.VITE_BASE_URL,
    };
  },
  components: { Icon, avatar, MailMobile },
  computed: {
    ...mapStores(useMailsStore, ["getMailById"]),
    mail() {
      return this.mailsStore.getMailById(this.$route.params.id);
    },
  },
  methods: {
    goBack() {
      window.history.go(-1);
      return false;
    },
    handleResize() {
      this.width = window.innerWidth;
    },
    convertDate(stringDate) {
      const date = new Date(stringDate);
      const localDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const localTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${localDate}, ${localTime}`;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
.mail {
  flex: 1;
  background-color: var(--sections-bg-color);
  border-radius: 16px;
  overflow-x: hidden;
  height: 84vh;
}
.mail__header {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
}
.mail__title {
  display: flex;
  justify-content: space-between;
  padding: 20px 32px 8px 72px;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 127%;
  letter-spacing: -0.12px;
  & span {
    margin-right: 14px;
  }
  & .action-btn:not(:last-child) {
    margin-right: 16px;
  }
}
.btn-group {
  display: inline-block;
  &:not(:last-child) {
    margin-right: 42px;
    &::after {
      content: "";
      position: relative;
      display: inline-block;
      background-color: #e5e5e5;
      width: 1px;
      top: 8px;
      left: 21px;
      height: 20px;
    }
  }
}
.mail__senter {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 0 16px;
}
.mail__info {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.senter {
  margin-right: auto;
  & > *:not(:last-child) {
    margin-right: 4px;
  }
  & .name {
    font-size: 1rem;
    font-weight: 600;
    line-height: 143%;
    letter-spacing: 0.02px;
    color: var(--text-black-color);
  }
  & .email {
    font-size: 0.857rem;
    line-height: 116%;
    letter-spacing: 0.02em;
    color: var(--items-gray-color);
  }
  & .unsubscribe {
    font-size: 0.857rem;
    line-height: 116%;
    letter-spacing: -0.02em;
    color: var(--items-gray-color);
  }
}
.right-side {
  & .date {
    font-size: 0.857rem;
    line-height: 116%;
    text-align: right;
    letter-spacing: 0.02em;
    color: #5f6368;
    margin-right: 17px;
  }
  & .action-btn:not(:last-child) {
    margin-right: 10px;
  }
}
.action-btn {
  width: 40px;
  height: 40px;
  &._disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
.mail__message {
  margin: 10px 70px;
}

.mail__empty-content {
  text-align: center;
  font-weight: 600;
  margin-top: 20%;
  font-size: 3rem;
  line-height: 120%;
  color: var(--side-menu-gray);
  opacity: 0.16;
}
</style>
