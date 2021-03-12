import axios from "axios";

const { API_URL } = process.env;

export const fetchStrapi = (method, endUrl, data) => {
  return axios.request({
    method: method,
    url: `${API_URL}/${endUrl}`,
    data
  });
};
