<template>
  <div>
    <img
      :src="src"
      alt=""
      class="avatar"
      :style="{ width: size + 'px', height: size + 'px' }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    size: Number,
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  object-fit: cover;
  border-radius: 50%;
}
</style>
