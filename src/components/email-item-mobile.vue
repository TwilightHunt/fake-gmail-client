<template>
  <div class="email-item_mobile">
    <avatar class="email-item__avatar" :src="avatarURL" :size="40" />
    <div class="email-item__content">
      <div class="email-item__content__head mail-head">
        <div class="email-item__content__senter mail-head__senter">
          {{ info.senter.firstname }} {{ info.senter.lastname }}
        </div>
        <v-icon color="#5F6368">mdi-attachment</v-icon>
        <div class="email-item__content__date mail-head__date">
          {{ info.date }}
        </div>
      </div>
      <div class="email-item__content__topic">
        {{ info.topic || "< No topic >" }}
      </div>
      <div class="email-item__content__message">
        <p>{{ info.message }}</p>
        <v-icon color="#5F6368">mdi-star-outline</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "./avatar.vue";
export default {
  data() {
    return {
      avatarURL: `${import.meta.env.VITE_BASE_URL}/${
        this.info.senter.profileImage
      }`,
    };
  },
  props: {
    info: Object,
  },
  components: { avatar },
};
</script>

<style lang="scss" scoped>
.email-item_mobile {
  display: flex;
  color: var(--text-black-color);
  padding: 15px 20px;
  word-break: break-all;
}
.email-item__avatar {
  margin-right: 15px;
}
.email-item__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.mail-head {
  display: flex;
  align-items: center;
}
.mail-head__senter {
  margin-right: auto;
  font-size: 1.2em;
  line-height: 150%;
  font-weight: 600;
  white-space: nowrap;
}
.email-item__content__message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & p {
    padding-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.email-item__content__topic {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-right: 26px;
}
</style>
