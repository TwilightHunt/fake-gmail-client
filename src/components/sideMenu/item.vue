<template>
  <router-link
    :to="path ? `/uid=${$route.params.uid}/section=${path}` : $route.path"
    class="link"
    :class="this.$route.params?.section === path ? '_active' : ''"
  >
    <icon :name="name" class="icon" />
    <div class="title">{{ value }}</div>
    <div class="counter">{{ amount }}</div>
  </router-link>
</template>

<script>
import Icon from "../iconfont.vue";
export default {
  props: {
    path: String,
    name: String,
    value: String,
    amount: Number,
  },
  components: { Icon },
};
</script>

<style lang="scss" scoped>
.link {
  color: var(--secondary-text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 24px;
  border-radius: 0px 20px 20px 0px;
  &:hover {
    background-color: var(--side-items-hover);
  }
  &._active {
    background-color: var(--side-items-active);
  }
  &._bold {
    & > .title,
    .counter {
      font-weight: 800;
    }
  }
}
.title {
  margin-right: auto;
  padding-left: 1vw;
}
.counter {
  font-size: 0.857em;
}
.icon {
  padding: 8px 0;
  min-width: 16px;
  min-height: 32px;
}
</style>
