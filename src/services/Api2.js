import React, { useState } from "react";
import axios from "axios";
import { getToken } from "./Auth";

export default function Api() {
  const [token, setToken] = useState();
  return axios
    .post(`http://52.149.163.55:6161/api/authentication/login`, {
      idEmpresa: 1,
      hashkey: "85853456",
      uid: "123456",
      password: "123456",
      versao: "0.0.3",
    })
    .then((response) => {
      return console.log("Certo: ", response);
    })
    .catch((error) => {
      console.log("errado");
    });
}

// const api = axios.create({
//     baseURL: 'http://52.149.163.55:6161/api/authentication/login',
//     responseType: 'json'
// });

// api.interceptors.request.use(async config => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log(token);
//     }
//     return config;
// });

// export default api;
