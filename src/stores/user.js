import { defineStore } from "pinia";
import { AuthApi } from "../api/auth";
import { DefaultApiInstanse, LoginApiInstanse } from "../api";

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

        DefaultApiInstanse.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;

        AuthApi.register(data).then((res) => {
          this.user = res.data;
          this.isAuth = true;
          this.credentials.accessToken = res.data.token;
          localStorage.setItem("access_token", res.data.token);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async login(email, password) {
      try {
        const data = { email, password };

        LoginApiInstanse.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;

        await AuthApi.login(data).then((res) => {
          this.user = res.data.user;
          this.isAuth = true;
          this.credentials.accessToken = res.data.token;
          localStorage.setItem("access_token", res.data.token);
        });
      } catch (error) {
        throw new Error(error);
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
          console.log(newUser);

          if (newUser) {
            this.isAuth = true;
          }

          this.user = newUser;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async update(property, value) {
      try {
        const entries = Object.entries(this.user);

        let formData = new FormData();
        entries.forEach(([key, val] = entry) => {
          formData.set(key, val);
        });

        formData.set(property, value);

        AuthApi.update(formData);
      } catch (error) {
        console.log(error);
      }
    },
    async findUserByEmail(email) {
      try {
        const res = await AuthApi.getUserByEmail({ email });
        return res.data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  persist: true,
});
