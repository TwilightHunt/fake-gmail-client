<template>
  <img
    :src="src"
    alt=""
    class="avatar"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
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
