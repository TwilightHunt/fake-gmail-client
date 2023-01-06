import { DefaultApiInstanse} from "..";

export const MailApi = {
  send(data) {
    const url = "/mail/send";
    return DefaultApiInstanse.post(url, data);
  },
};