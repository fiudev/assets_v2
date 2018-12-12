import axios from "axios";
import config from "./config.js";

const { AUTH_URL } = config;

const ui = axios.create({ baseURL: AUTH_URL });

const login = email =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await ui.post("/tokens", { email });
      const { token } = data.data;
      resolve(token);
    } catch (e) {
      reject(e);
    }
  });

export default { login };
