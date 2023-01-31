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
    } else {
      this.$router.push("/auth");
    }
  },
  computed: {
    ...mapStores(useUserStore, useMailsStore),
    ...mapState(useUserStore, ["user"]),
  },
};
</script>

<style>
:root {
  --main-bg-color: #f6f8fc;
  --deep-bg-color: #eef3fc;
  --items-blue-color: #0b57d0;
  --light-blue-color: #1374e9;
  --items-black-color: #333333;
  --text-black-color: #1f1f1f;
  --items-gray-color: #5f6368;
  --side-menu-gray: #202124;
  --titles-color: #212121;
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
}
</style>
