import { defineStore } from "pinia";
import { AuthApi } from "../api/auth";
import { DefaultApiInstanse } from "../api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    credentials: {
      accessToken: localStorage.getItem("access_token") || null,
    },
  }),
  actions: {
    async login(email, password) {
      try {
        const data = { email, password };

        AuthApi.login(data).then((res) => {
          console.log(res);
          this.user = res.data.user;
          this.credentials.accessToken = res.data.accessToken;
          DefaultApiInstanse.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("access_token")}`;
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
