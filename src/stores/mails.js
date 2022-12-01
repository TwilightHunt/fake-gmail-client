import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMailsStore = defineStore({
  id: "mails",
  state: () => ({
    mails: [],
  }),
  actions: {
    async fetchMails() {
      await fetch("https://randomuser.me/api/?results=25")
        .then((res) => res.json())
        .then((emails) => (this.mails = emails.results))
        .catch((error) => console.log(error));
    },
  },
  getters: {
    getMailById: (state) => (id) =>
      state.mails.find((mail) => mail.login.username == id),
  },
});
