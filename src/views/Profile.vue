<template>
  <div class="profile-body">
    <img :src="imagePath" alt="" />
    <v-btn @click="updatePicture">Change image </v-btn>
    <input
      type="file"
      id="image"
      name="New image"
      accept="image/png, image/jpeg, image/jpg"
      @change="showPreview"
    />
    <img
      :class="`temp-img ${this.imageIsSelected ? '_active' : ''}`"
      :src="imageUrl"
      alt="avatar"
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
      tempImage: {},
      imageUrl: "",
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
      this.tempImage = event.target.files[0];
      this.imageUrl = URL.createObjectURL(event.target.files[0]);
      this.imageIsSelected = true;
    },
    async updatePicture() {
      try {
        const userStore = useUserStore();
        await userStore.update("profileImage", this.tempImage);
      } catch (error) {
        console.log(error);
      }
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
