<template>
  <a :href="path" class="link">
    <div class="title">
      <icon :name="name" class="icon" />
      {{ value }}
    </div>
    <div class="counter">{{ amount }}</div>
  </a>
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
  color: #202124;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px 8px 26px;
  border-radius: 0px 16px 16px 0px;
  &:hover {
    background-color: #ebecef;
  }
  &._active {
    background-color: #d3e2fd;
  }
  &._bold {
    & > .title,
    .counter {
      font-weight: 800;
    }
  }
}
.title {
  display: flex;
  align-items: center;
  column-gap: 19px;
}
.counter {
  font-size: 0.857em;
}
</style>
