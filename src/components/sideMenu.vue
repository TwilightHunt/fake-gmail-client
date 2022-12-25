<template>
  <div class="side-menu">
    <v-btn block class="button_compose">
      <icon name="archive" class="icon" />
      Compose</v-btn
    >
    <nav class="links">
      <router-link to="/inbox" class="link">Inbox</router-link>
      <router-link to="/inbox" class="link">Inbox</router-link>
      <router-link to="/inbox" class="link">Inbox</router-link>
      <router-link to="/inbox" class="link">Inbox</router-link>
      <router-link to="/inbox" class="link">Inbox</router-link>
      <router-link to="/inbox" class="link">Inbox</router-link>
      <router-link to="/inbox" class="link">Inbox</router-link>
    </nav>
  </div>
</template>

<script>
import Icon from "./iconfont.vue";
export default {
  components: { Icon },
};
</script>

<style lang="scss" scoped>
.side-menu {
  padding: 30px;
  margin: 0 auto;
  width: 20em;
}
.button_compose {
}
.links {
  display: flex;
  flex-direction: column;
}
.link {
}
.icon {
  min-height: 10px;
  min-width: 10px;
}
</style>
