<script setup>
import avatar from "./avatar.vue";
import { useUserStore } from "../stores/user";
import Icon from "../components/iconfont.vue";

const { user } = useUserStore();

const avatarURL = `${import.meta.env.VITE_BASE_URL}/${user.profileImage}`;
</script>

<template>
  <div class="navigation">
    <v-btn icon elevation="0" class="mr-4" @click="$emit('hideSideMenu')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <img class="logo-img" src="../assets/logo.svg" alt="gmail" />
    <div class="search-input">
      <icon size="15" name="search" class="icon search-icon" />
      <input type="text" placeholder="Search mail" class="search" />
      <icon size="15" name="options-top" class="icon options-icon" />
      <router-link to="/profile">
        <avatar :src="avatarURL" :size="30" class="search-avatar" />
      </router-link>
    </div>
    <div class="tools">
      <v-btn icon elevation="0" class="tools__button action-btn">
        <icon size="20" name="help" class="icon tools__icon" />
      </v-btn>
      <v-btn
        icon
        elevation="0"
        class="tools__button action-btn"
        @click="$emit('toggleSettingVisibility')"
      >
        <icon size="20" name="settings" class="icon tools__icon" />
      </v-btn>
      <v-btn icon elevation="0" class="tools__button action-btn">
        <icon size="16" name="apps" class="icon tools__icon" />
      </v-btn>
      <router-link to="/profile">
        <avatar :src="avatarURL" :size="40" class="avatar" />
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  padding: 8px 10px;
  display: flex;
  align-items: center;
}
.search {
  background: var(--deep-bg-color);
  border-radius: 8px;
  width: 37.6vw;
  padding: 15px 57px;
  color: var(--main-text-color);
}
.search-input {
  position: relative;
}
.search-icon {
  position: absolute;
  top: 31.5%;
  left: 17px;
}
.options-icon {
  position: absolute;
  top: 31.5%;
  right: 17px;
  cursor: pointer;
}
.tools {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.search-avatar {
  display: none;
}
.logo-img {
  cursor: pointer;
  margin-right: clamp(10px, 5%, 100px);
}
.v-btn.tools__button {
  width: 38px;
  height: 38px;
  margin: 2px;
}
.v-btn {
  background-color: var(--main-bg-color);
  color: var(--items-color);
}
.avatar {
  margin-left: 10px;
}
@media (max-width: 1129px) {
  .tools__button {
    display: none;
  }
  .navigation {
    justify-content: space-between;
  }
  .tools {
    margin-left: 10px;
  }
  .search-input {
    flex: 1;
  }
  .search {
    width: 100%;
  }
}
@media (max-width: 618px) {
  .tool-btn,
  .logo-img {
    display: none;
  }
}
@media (max-width: 486px) {
  .tools {
    display: none;
  }
  .search-avatar {
    position: absolute;
    display: block;
    top: 8px;
    right: 17px;
  }
}
</style>
