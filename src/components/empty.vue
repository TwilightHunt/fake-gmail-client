<template>
  <div class="empty"><p>There are no mails here</p></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.empty {
  font-weight: 600;
  font-size: 3rem;
  line-height: 120%;
  color: #202124;
  opacity: 0.16;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 0 30px;
}
</style>
