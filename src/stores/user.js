import { defineStore } from "pinia";
import { AuthApi } from "../api/auth";
import { DefaultApiInstanse } from "../api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    isAuth: false,
    credentials: {
      accessToken: localStorage.getItem("access_token") || null,
    },
  }),
  actions: {
    async register(email, firstname, lastname, password, profileImage) {
      try {
        const data = { email, firstname, lastname, password, profileImage };

        AuthApi.register(data).then((res) => {
          this.user = res.data;
          this.isAuth = true;
          this.credentials.accessToken = res.data.token;
          localStorage.setItem("access_token", res.data.token);
          DefaultApiInstanse.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("access_token")}`;
        });
      } catch (error) {
        console.error(error);
      }
    },
    async login(email, password) {
      try {
        const data = { email, password };

        AuthApi.login(data).then((res) => {
          this.user = res.data.user;
          this.isAuth = true;
          this.credentials.accessToken = res.data.token;
          localStorage.setItem("access_token", res.data.token);
          DefaultApiInstanse.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("access_token")}`;
        });
      } catch (error) {
        console.error(error);
      }
    },

    async logout() {
      try {
        AuthApi.logout().then((res) => {
          this.user = {};
          this.isAuth = false;
          this.credentials.accessToken = "";
          localStorage.removeItem("access_token");
        });
      } catch (error) {
        console.error(error);
      }
    },

    async checkAuth() {
      try {
        AuthApi.refresh().then((res) => {
          localStorage.setItem("access_token", res.data.accessToken);
          const newUser = res.data.user;

          if (newUser) {
            this.isAuth = true;
          }

          this.user = newUser;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: true,
});
