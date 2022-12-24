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
    const url = "/user";
    return UpdateApiInstanse.put(url, data);
  },
  refresh() {
    const url = "/refresh";
    return DefaultApiInstanse.get(url);
  },
  getUser(user) {
    const url = "/users";
    return DefaultApiInstanse.get(url);
  },
};