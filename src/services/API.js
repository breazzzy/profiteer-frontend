import axios from "axios";
import { UserStore } from "@/stores/UserStore";

export default () => {
  const store = UserStore();
  return axios.create({
    //URL for database
    baseURL: "http://localhost:5000",

    //This header is sent with every single api call, essentially everytime we communicate
    // with the backend these headers are added to whatever the communication is.
    //Authorization: Bearer is the default header spot for the passport api.
    //We send our JWT token to the server, and the server uses that to authenticate
    //For routes that dont need authentication(ei: simple stock searches) the server just ignores the header
    //This is how we make sure the user is logged in.
    //The token is encrypted and only the server knows the key.
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
