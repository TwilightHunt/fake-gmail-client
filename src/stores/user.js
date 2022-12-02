import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
  }),
  actions: {
    async login(data) {
      try {
        const user = await axios.post("/login", data);
        this.user = user.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getMailById: (state) => (id) =>
      state.mails.find((mail) => mail.login.username == id),
  },
});
