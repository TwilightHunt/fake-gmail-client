<template>
  <div class="side-menu">
    <button class="button_compose" @click="$emit('changeComposeVisibility')">
      <icon name="pen" class="icon_btn" />
      Compose
    </button>
    <nav class="links">
      <Item
        :path="'/indox'"
        :name="'inbox'"
        :value="'Inbox'"
        :amount="311"
        class="_active _bold"
      />
      <Item :path="'/indox'" :name="'star'" :value="'Starred'" />
      <Item :path="'/indox'" :name="'clocks'" :value="'Snoozed'" />
      <Item :path="'/indox'" :name="'importnat'" :value="'Imoprtant'" />
      <Item :path="'/indox'" :name="'chat'" :value="'Chats'" />
      <Item :path="'/indox'" :name="'sent'" :value="'Sent'" />
      <Item :path="'/indox'" :name="'draft'" :value="'Drafts'" />
      <Item
        :path="'/indox'"
        :name="'spam'"
        :value="'Spam'"
        :amount="311"
        class="_bold"
      />
      <Item :path="'/indox'" :name="'mail'" :value="'All mail'" />
      <Item :path="'/indox'" :name="'bin'" :value="'Bin'" />
      <Item :path="'/indox'" :name="'down-arrow'" :value="'More'" />
    </nav>
  </div>
</template>

<script>
import Item from "./item.vue";
import Icon from "../iconfont.vue";

export default {
  components: { Item, Icon },
};
</script>

<style lang="scss" scoped>
.side-menu {
  margin-right: 16px;
  width: 240px;
}
.button_compose {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-radius: 16px;
  font-family: "Google Sans";
  text-transform: capitalize;
  background-color: #c2e7ff;
  margin: 8px;
}
.links {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
}
.icon_btn {
  margin-right: 16px;
}
</style>
