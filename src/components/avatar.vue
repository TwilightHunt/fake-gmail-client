<template>
  <div>
    <img :src="src" alt="" class="avatar" />
  </div>
</template>

<script>
export default {
  props: {
    src: String,
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  height: 2vw;
  width: 2vw;
  object-fit: cover;
  border-radius: 50px;
}
</style>
