import axios from "axios";

export const ApiHelper = {
  _BASE_URL: "http://localhost:5000",
  get(url) {
    return axios.get(`${this._BASE_URL}/${url}`);
  }
};
