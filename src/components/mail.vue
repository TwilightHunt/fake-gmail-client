<template>
  <div class="mail">
    <header class="mail__header">
      <v-btn icon elevation="0" class="action-btn">
        <Icon name="backwards-arrow" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="archive" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="spam" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="bin" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="mail" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="clocks" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="shedule" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="drive" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="label" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="options" class="icon" color="#333333" />
      </v-btn>
    </header>
    <div class="mail__title">
      <span>Subject title</span>
      <icon name="label" class="icon" color="#333333" />
    </div>
    <div class="mail__info">
      <img src="../assets/imgSender.svg" alt="" class="mail__senter" />
    </div>
    <div class="mail__content"></div>
  </div>
</template>

<script>
import Icon from "../components/iconfont.vue";
export default {
  components: { Icon },
};
</script>

<style lang="scss" scoped>
.mail {
  flex: 1;
  background-color: #fff;
  border-radius: 16px;
  overflow-x: hidden;
}
.mail__senter {
  border-radius: 50%;
}
</style>
