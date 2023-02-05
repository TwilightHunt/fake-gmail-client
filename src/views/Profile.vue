<template>
  <div class="profile-body" id="wrapper">
    <avatar :src="imagePath" :size="150" alt="" />
    <v-btn @click="updatePicture">Change image </v-btn>
    <input
      type="file"
      id="image-input"
      name="New image"
      accept="image/png, image/jpeg, image/jpg"
      @change="showPreview"
    />
    <img
      v-if="imageIsSelected"
      :class="`temp-img ${this.imageIsSelected ? '_active' : ''}`"
      :src="imageUrl"
      alt="avatar"
    />
    <h4>{{ user.firstname }} {{ user.lastname }}</h4>
    <div>{{ user.email }}</div>
    <v-btn @click="logout">Logout</v-btn>
  </div>
  <router-view></router-view>
</template>

<script>
import { useUserStore } from "../stores/user";
import { useMailsStore } from "../stores/mails";
import { ref } from "vue";
import avatar from "../components/avatar.vue";
import { compress } from "image-conversion";

export default {
  data() {
    return {
      imagePath: `${import.meta.env.VITE_BASE_URL}/${this.user.profileImage}`,
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
  components: {
    avatar,
  },
  methods: {
    async showPreview(event) {
      this.imageIsSelected = true;

      const res = await compress(event.target.files[0], {
        quality: 0.8,
        type: "image/jpeg",
        width: 100,
        height: 100,
        scale: 0.5,
      });
      this.imageUrl = URL.createObjectURL(res);
      this.tempImage = res;
    },
    async updatePicture() {
      try {
        const userStore = useUserStore();
        await userStore.update("profileImage", this.tempImage);
        this.imageIsSelected = false;
        userStore.checkAuth();
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      const userStore = useUserStore();
      const mailStore = useMailsStore();
      await userStore.logout();
      mailStore.emptyStore();
      this.$router.push("/auth");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-body {
  display: grid;
  grid-template-rows: min-content;
  row-gap: 1rem;
  max-width: 10rem;
}
.temp-img {
  visibility: visible;
  object-fit: cover;
}
.v-btn {
  background-color: var(--main-bg-color);
  border: 1px solid var(--main-text-color);
}
#image-input {
  color: #000;
}
</style>
