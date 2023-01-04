<template>
  <div>
    <v-btn icon elevation="0" class="action-btn">
      <icon :name="name" :size="size" class="icon" color="#333333" />
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    size: Number,
  },
};
</script>

<style lang="scss" scoped></style>
