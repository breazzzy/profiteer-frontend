import axios from "axios";
import { UserStore } from "@/stores/UserStore";

export default () => {
  const store = UserStore();
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
