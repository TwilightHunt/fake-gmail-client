<template>
  <router-view />
</template>

<script>
import { mapStores, mapState } from "pinia";
import { useUserStore } from "./stores/user";
import { useMailsStore } from "./stores/mails";
export default {
  mounted() {
    if (localStorage.getItem("access_token")) {
      this.userStore.checkAuth();
      this.mailsStore.getMails();
      this.$router.push(
        `/uid=${this.user.id}/section=${this.$route.params.section ?? "inbox"}`
      );
      this.setBodyTheme();
    } else {
      this.$router.push("/auth");
    }
  },
  computed: {
    ...mapStores(useUserStore, useMailsStore),
    ...mapState(useUserStore, ["user"]),
  },
  methods: {
    setBodyTheme() {
      const body = document.body;
      const cachedTheme = localStorage.getItem("theme");
      const theme = cachedTheme || "light";

      body.setAttribute("data-theme", theme);
    },
  },
};
</script>

<style>
:root {
  --items-blue-color: #0b57d0;
  --light-blue-color: #1374e9;
  --items-black-color: #333333;
}
[data-theme="light"] {
  --main-bg-color: #f6f8fc;
  --sections-bg-color: #fff;
  --sections-bg-color-hover: #ebecef;
  --main-text-color: #1f1f1f;
  --secondary-text-color: #202124;
  --side-items-hover: #ebecef;
  --side-items-active: #d3e2fd;
  --compose-button-color: #c2e7ff;
  --deep-bg-color: #eef3fc;
  --titles-color: #212121;
  --items-color: #5f6368;
  --icons-color: #333;
}
[data-theme="dark"] {
  --main-bg-color: #000000;
  --sections-bg-color: #111;
  --sections-bg-color-hover: #202020;
  --main-text-color: #fff;
  --secondary-text-color: #fff;
  --side-items-hover: #2e2f33;
  --side-items-active: #5c5c5c;
  --compose-button-color: #ffffff;
  --deep-bg-color: #161616;
  --titles-color: #fff;
  --items-color: #fff;
  --icons-color: #fff;
}
@font-face {
  font-family: "Google Sans";
  src: url("./fonts/GoogleSans-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Google Sans";
  src: url("./fonts/GoogleSans-Medium.ttf") format("truetype");
  font-weight: 600;
}
@font-face {
  font-family: "Google Sans";
  src: url("./fonts/GoogleSans-Bold.ttf") format("truetype");
  font-weight: 800;
}
::-webkit-scrollbar {
  width: 0;
}
body {
  font-family: "Google Sans";
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 114%;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}
* {
  transition: all 0.4s ease;
}
</style>
