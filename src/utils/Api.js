import axios from "axios";

const API_URL = "http://localhost:3001";

export const login = (email, password) => {
  return axios.post("/login", { email, password,})
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.token);
    }
    return response.data;
  })
  .catch((error) => {
    console.log(error)
  });
};
