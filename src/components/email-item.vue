<script setup>
import avatar from "./avatar.vue";

const props = defineProps({
  info: Object,
});
</script>

<template>
  <router-link :to="`${info.senter.email}`">
    <div class="email-item _container">
      <div>
        <input
          type="checkbox"
          name=""
          id=""
          class="email-item__checkbox"
          @click.stop
        />
        <avatar
          :src="`http://localhost:8080/${info.senter.profileImage}`"
          :size="40"
        />
        <div class="senter">{{ info.senter.firstname }}</div>
      </div>
      <div>
        <div class="email-item__title">{{ info.senter.lastname }}</div>
        <div class="email-item__snippet">
          {{ info.message }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.email-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: #000;
  row-gap: 2rem;
  border: solid 1px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  & > div {
    display: inline-flex;
    align-items: center;
    justify-self: start;
    gap: 2rem;
  }
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
}
a {
  text-decoration: none;
}
.email-item__icon {
  height: 2vw;
  width: 2vw;
  object-fit: cover;
  border-radius: 50px;
}
.senter {
  font-weight: 600;
}
.email-item__snippet {
  opacity: 0.5;
  max-width: 3em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
