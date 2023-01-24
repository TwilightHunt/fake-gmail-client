<script setup>
import avatar from "./avatar.vue";
import { useUserStore } from "../stores/user";

const { user } = useUserStore();

const avatarURL = `${import.meta.env.VITE_BASE_URL}/${user.profileImage}`;
</script>
<template>
  <div class="navigation">
    <v-btn
      icon
      elevation="0"
      class="mr-4"
      @click="$emit('hideSideMenu')"
      color="#EEF3FC"
    >
      <v-icon color="#5F6368">mdi-menu</v-icon>
    </v-btn>
    <img class="logo-img" src="../assets/logo.svg" alt="gmail" />
    <div class="search-input">
      <img
        class="serach-image"
        src="../assets/icons/navigation/search.svg"
        alt="search"
      />
      <input type="text" placeholder="Search mail" class="search" />
      <img
        class="options"
        src="../assets/icons/navigation/options.svg"
        alt="search"
      />
      <router-link to="/profile">
        <avatar :src="avatarURL" :size="30" class="search-avatar" />
      </router-link>
    </div>
    <div class="tools">
      <img
        src="../assets/icons/navigation/help.svg"
        alt="help"
        class="help tool-btn"
      />
      <img
        src="../assets/icons/navigation/settings.svg"
        alt="settings"
        class="settings tool-btn"
      />
      <img
        src="../assets/icons/navigation/apps.svg"
        alt="apps"
        class="apps tool-btn"
      />
      <router-link to="/profile">
        <avatar :src="avatarURL" :size="40" />
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
  background: #eef3fc;
  border-radius: 8px;
  width: 37.6vw;
  padding: 15px 57px;
}
.search-input {
  position: relative;
}
.serach-image {
  position: absolute;
  top: 31.5%;
  left: 17px;
}
.options {
  position: absolute;
  top: 31.5%;
  right: 17px;
}
.tools {
  margin-left: auto;
  display: flex;
  column-gap: 20px;
}
.search-avatar {
  display: none;
}
.logo-img {
  cursor: pointer;
  margin-right: clamp(10px, 5%, 100px);
}
@media (max-width: 618px) {
  .tool-btn,
  .logo-img {
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
@media (max-width: 486px) {
  .options,
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
