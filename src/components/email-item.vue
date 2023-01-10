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
          class="email-item__icon"
          :src="`http://localhost:8080/${info.senter.profileImage}`"
          :size="40"
        />
        <div class="senter">{{ info.senter.firstname }}</div>
      </div>
      <div>
        <div class="email-item__title">
          {{ info.topic ?? "< No topic >" }}
          <span> - {{ info.message }} </span>
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
  align-items: center;
  margin: 5px 0;
  margin-right: 15px;
}
.senter {
  font-weight: 600;
}
.email-item__checkbox {
  margin-right: 12px;
}
.email-item__title {
  max-width: 3em;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  & > span {
    opacity: 0.5;
    font-weight: 400;
  }
}
</style>
