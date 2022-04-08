import axios from "axios";
import { UserStore } from "@/stores/UserStore";

export default () => {
  const store = UserStore();
  return axios.create({
    baseURL: "http://localhost:5000",
    //This header is sent with every single api call
    //Authorization: Bearer is the default header spot for passport.
    //We send our JWT to the server, and the server uses that to authenticate
    //For routes that dont need authentication(ei: simple stock searches) the server ignores this
    //This is how we make sure the user is logged in.
    //The token is encrypted and only the server knows the key.
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
