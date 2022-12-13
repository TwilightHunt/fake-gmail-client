import { LoginApiInstanse, DefaultApiInstanse, UpdateApiInstanse } from "..";

export const AuthApi = {
  register(data) {
    try {
      const url = "/register";
      return DefaultApiInstanse.post(url, data);
    } catch (error) {
      console.log(error);
    }
  },
  login(data) {
    const url = "/login";
    return LoginApiInstanse.post(url, data);
  },
  logout() {
    const url = "/logout";
    return DefaultApiInstanse.post(url);
  },
  update(data) {
    console.log(data);
    const url = "/user";
    return UpdateApiInstanse.put(url, data);
  },
  refresh() {
    const url = "/refresh";
    return DefaultApiInstanse.get(url);
  },
};

DefaultApiInstanse.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 401) {
      try {
        const originalRequest = error.config;

        console.log(originalRequest);

        localStorage.removeItem("access_token");
        const response = DefaultApiInstanse.get("/refresh");
        localStorage.setItem("access_token", response.data.accessToken);
        location.reload();
        return response;
      } catch (error) {
        console.log(e);
      }
    }
    return Promise.reject(error);
  }
);
