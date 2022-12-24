<template>
  <div class="side-menu">
    <v-btn class="button_compose">Compose</v-btn>
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
export default {};
</script>

<style lang="scss" scoped>
.side-menu {
  padding: 30px;
  margin: 0 auto;
  width: 20em;
}
.button_compose {
  margin: 0;
  width: 100%;
}
.links {
  display: flex;
  flex-direction: column;
}
.link {
}
</style>
