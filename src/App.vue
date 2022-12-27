<script setup></script>

<template>
  <router-view> </router-view>
</template>
<style>
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
* {
  font-family: "Google Sans";
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 114%;
}
body {
  overflow: hidden;
  background-color: #f6f8fc;
  max-height: 100vh;
}
</style>
