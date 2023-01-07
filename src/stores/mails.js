import { defineStore } from "pinia";
import { DefaultApiInstanse, LoginApiInstanse } from "../api";
import { MailApi } from "../api/mails";

export const useMailsStore = defineStore({
  id: "mails",
  state: () => ({
    receivedMails: [],
    sentMails: []
  }),
  actions: {
    async fetchMails() {
      await fetch("https://randomuser.me/api/?results=25")
        .then((res) => res.json())
        .then((emails) => (this.receivedMails = emails.results))
        .catch((error) => console.log(error));
    },
    async sendMail(receiver, senter, message){
      try {
        const data = {receiver, senter, message}

        MailApi.send(data).then((res) => {
          this.getMails()
        })
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async getMails(){
      DefaultApiInstanse.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("access_token")}`;
      MailApi.getMails().then((res) => {
        console.log(DefaultApiInstanse.defaults);
      })
    }
  },
  getters: {
    getMailById: (state) => (id) =>
      state.mails.find((mail) => mail.login.username == id),
  },
});
