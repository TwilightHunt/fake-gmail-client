import { DefaultApiInstanse} from "..";

export const MailApi = {
  send(data) {
    const url = "/mail/send";
    return DefaultApiInstanse.post(url, data);
  },
  getMails() {
    const url = "/mails";
    return DefaultApiInstanse.get(url);
  },
};