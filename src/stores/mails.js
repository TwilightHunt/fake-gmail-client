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
   
    async sendMail(receiver, senter, topic, message){
      try {
        const data = {receiver, senter, topic, message}

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
        this.sentMails = res.data.sentMails;
        this.receivedMails = res.data.receivedMails;
      })
    }
  },
  getters: {
    getMailById: (state) => (id) =>{
      const allMails = state.receivedMails.concat(state.sentMails)
      const mail = allMails.find(element => element._id === id);

      return mail;
    }
  },
});
