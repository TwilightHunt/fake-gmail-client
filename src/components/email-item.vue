<script setup>
import avatar from "./avatar.vue";

const props = defineProps({
  info: Object,
});

const avatarURL = `${import.meta.env.VITE_BASE_URL}/${
  props.info.senter.profileImage
}`;
</script>

<template>
  <router-link :to="`${$route.path}/mail=${info._id}`">
    <div class="email-item _container">
      <div class="left">
        <input
          type="checkbox"
          name=""
          id=""
          class="email-item__checkbox"
          @click.stop
        />
        <avatar class="email-item__icon" :src="avatarURL" />
        <div class="senter">
          {{ info.senter.firstname }} {{ info.senter.lastname }}
        </div>
      </div>
      <div class="email-item__title">
        <span class="email-item__topic">
          {{ info.topic ?? "< No topic >" }}
        </span>
        <span class="email-item__message"> - {{ info.message }} </span>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.email-item {
  display: grid;
  grid-template-columns: 50% 50%;
  color: #000;
  column-gap: 1.5rem;
  border: solid 1px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  overflow: hidden;
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
  width: 40px;
  height: 40px;
}
.senter {
  font-weight: 600;
}
.email-item__checkbox {
  margin-right: 12px;
}
.email-item__title {
  font-weight: 600;
  max-width: 39vw;
}
.email-item__message {
  opacity: 0.5;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
@media (max-width: 618px) {
  .email-item__icon {
    width: 30px;
    height: 30px;
  }
}
</style>
