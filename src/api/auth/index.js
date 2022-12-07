import { LoginApiInstanse, DefaultApiInstanse } from "..";

export const AuthApi = {
  login(data) {
    const url = "/login";
    console.log(data);
    return LoginApiInstanse.post(url, data);
  },
};
