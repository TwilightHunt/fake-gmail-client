<template>
  <div class="profile-body">
    <img :src="imagePath" alt="" />
    <v-btn>Change image </v-btn>
    <input
      type="file"
      id="image"
      name="New image"
      accept="image/png, image/jpeg, image/jpg"
      @change="showPreview"
    />
    <img
      :class="`temp-img ${this.imageIsSelected ? '_active' : ''}`"
      :src="tempImage"
      alt=""
    />
    <h4>{{ user.firstname }} {{ user.lastname }}</h4>
    <div>{{ user.email }}</div>
  </div>
  <router-view></router-view>
</template>

<script>
import { useUserStore } from "../stores/user";
import { ref } from "vue";

export default {
  data() {
    return {
      imagePath: `http://localhost:8080/${this.user.profileImage}`,
      tempImage: "",
      imageIsSelected: false,
    };
  },
  setup() {
    const userStore = useUserStore();
    const user = ref(userStore.user);
    return {
      user,
    };
  },
  methods: {
    showPreview(event) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      this.tempImage = newImage;
      this.imageIsSelected = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-body {
  display: grid;
  grid-template-rows: min-content;
  row-gap: 1rem;
  max-width: 5rem;
}
.temp-img {
  visibility: hidden;
  &._active {
    visibility: visible;
    width: 10rem;
    height: 10rem;
  }
}
</style>
