<template>
  <div class="side-menu" v-click-outside="close">
    <button class="button_compose" @click="$emit('changeComposeVisibility')">
      <icon name="pen" class="icon_btn" />
      <p>Compose</p>
    </button>
    <nav class="links" @click="close">
      <Item
        :path="'inbox'"
        :name="'inbox'"
        :value="'Inbox'"
        :amount="311"
        class="_bold"
      />
      <Item :path="'starred'" :name="'star'" :value="'Starred'" />
      <Item :path="'snoozed'" :name="'clocks'" :value="'Snoozed'" />
      <Item :path="'important'" :name="'importnat'" :value="'Imoprtant'" />
      <Item :path="'chats'" :name="'chat'" :value="'Chats'" />
      <Item :path="'sent'" :name="'sent'" :value="'Sent'" />
      <Item :path="'drafts'" :name="'draft'" :value="'Drafts'" />
      <Item
        :path="'spam'"
        :name="'spam'"
        :value="'Spam'"
        :amount="311"
        class="_bold"
      />
      <Item :path="'all'" :name="'mail'" :value="'All mail'" />
      <Item :path="'bin'" :name="'bin'" :value="'Bin'" />
      <Item :path="'more'" :name="'down-arrow'" :value="'More'" />
    </nav>
  </div>
</template>

<script>
import Item from "./item.vue";
import Icon from "../iconfont.vue";

export default {
  components: { Item, Icon },
  methods: {
    close(event) {
      const navigation = document.querySelector(".navigation");
      if (!navigation.contains(event.target)) {
        document.querySelector(".side-menu").classList.add("_closed");
      }
    },
  },
};
</script>

<style lang="scss">
.side-menu {
  margin-right: 16px;
  width: 12.5vw;
  &._closed:not(:hover) {
    width: auto;
    margin: 0;
    & .link {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-left: 16px;
      padding: 0;
    }
    & .button_compose p,
    & .link .counter,
    & .link .title {
      display: none;
    }
    & .button_compose .icon_btn,
    & .link .icon {
      margin: 0 auto;
    }
  }
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
  transition: box-shadow 0.08s linear,
    min-width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    box-shadow: 3px 3px 10px 4px #0002;
  }
}
.links {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
}
.icon_btn {
  margin-right: 16px;
}
@media (max-width: 1129px) {
  .side-menu {
    position: absolute;
    z-index: 15;
    background-color: #fff;
    width: 250px;
    height: 100vh;
    transform: translateX(0);
    transition: transform 0.3s;
    &._closed {
      transform: translateX(-100%);
    }
    & .link {
      height: 40px;
      & .title {
        padding-left: 10px;
      }
    }
  }
}
</style>
