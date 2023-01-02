<template>
  <div class="tabs">
    <div class="tab">
      <input type="radio" name="css-tabs" id="tab-1" class="tab-switch" />
      <label for="tab-1" class="tab-label">Primary</label>
    </div>
    <div class="tab">
      <input type="radio" name="css-tabs" id="tab-2" class="tab-switch" />
      <label for="tab-2" class="tab-label">Promotions</label>
    </div>
    <div class="tab">
      <input type="radio" name="css-tabs" id="tab-3" class="tab-switch" />
      <label for="tab-3" class="tab-label">Socials</label>
    </div>
  </div>
</template>

<script>
import Icon from "./iconfont.vue";

export default {
  data() {
    return {
      isActive: false,
    };
  },
  props: {
    name: String,
    icon: String,
  },
  components: {
    Icon,
  },
  methods: {
    makeActive() {
      this.isActive = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-button {
  width: 252px;
  font-size: 0.875em;
  font-weight: 600;
  background-color: #fff;
  &:hover {
    background-color: #ebecef;
    cursor: pointer;
  }
  &._active {
    color: #1374e9;
  }
}
.icon {
  margin: 16px;
}
</style>
