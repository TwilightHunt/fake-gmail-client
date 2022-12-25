<template>
  <div class="side-menu">
    <button class="button_compose">
      <icon name="pen" class="icon_btn" />
      Compose
    </button>
    <nav class="links">
      <Item :path="'/indox'" :name="'inbox'" :value="'Inbox'" :amount="311" />
      <Item :path="'/indox'" :name="'star'" :value="'Starred'" />
      <Item :path="'/indox'" :name="'clocks'" :value="'Snoozed'" />
      <Item :path="'/indox'" :name="'importnat'" :value="'Imoprtant'" />
      <Item :path="'/indox'" :name="'chat'" :value="'Chats'" />
      <Item :path="'/indox'" :name="'sent'" :value="'Sent'" />
      <Item :path="'/indox'" :name="'draft'" :value="'Drafts'" />
      <Item :path="'/indox'" :name="'spam'" :value="'Spam'" :amount="311" />
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
  width: 20em;
}
.button_compose {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 16px;
  font-family: "Google Sans";
  text-transform: capitalize;
  background-color: #c2e7ff;
  margin: 8px;
}
.links {
  display: flex;
  flex-direction: column;
  margin: 8px 0;
}
.icon_btn {
  margin-right: 16px;
}
</style>
