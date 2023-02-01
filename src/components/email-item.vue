<template>
  <router-link :to="`${$route.path}/mail=${info._id}`">
    <div v-if="width > 618" class="email-item _container">
      <div class="left">
        <input
          type="checkbox"
          name=""
          id=""
          class="email-item__checkbox"
          @click.stop
        />
        <avatar class="email-item__icon" :src="avatarURL" />
        <div class="senter">
          {{ info.senter.firstname }} {{ info.senter.lastname }}
        </div>
      </div>
      <div class="email-item__title">
        <div class="email-item__topic">
          {{ info.topic || "< No topic >" }}
        </div>
        <div class="email-item__message">- {{ info.message }}</div>
      </div>
    </div>
    <Mobile :info="info" v-else />
  </router-link>
</template>

<script>
import avatar from "./avatar.vue";
import Mobile from "./email-item-mobile.vue";

export default {
  data() {
    return {
      avatarURL: `${import.meta.env.VITE_BASE_URL}/${
        this.info.senter.profileImage
      }`,
      width: 0,
    };
  },
  props: {
    info: Object,
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: { avatar, Mobile },
};
</script>

<style scoped lang="scss">
.email-item {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  min-width: 0px;
  color: var(--main-text-color);
  column-gap: 1.5rem;
  border: solid 1px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  overflow: hidden;
  & > div {
    display: inline-flex;
    align-items: center;
  }
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
}
a {
  text-decoration: none;
}
.email-item__icon {
  align-items: center;
  margin: 5px 0;
  margin-right: 15px;
  width: 40px;
  height: 40px;
}
.senter {
  font-weight: 600;
  white-space: nowrap;
}
.email-item__checkbox {
  margin-right: 12px;
}
.email-item__title {
  font-weight: 600;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}
.email-item__message {
  opacity: 0.5;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media (max-width: 1129px) {
  .email-item__checkbox {
    display: none;
  }
}
@media (max-width: 618px) {
  .email-item__icon {
    width: 30px;
    height: 30px;
  }
}
</style>
