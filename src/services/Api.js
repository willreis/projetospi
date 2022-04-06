import axios from "axios";
import React, { useState } from 'react';
import { useJwt } from "react-jwt";


function Api(){

const [token, setToken] = useState();


const mountHeader = async (token) => {
  return {
    "cache-control": "no-cache",
    "Transfer-Encoding": "chunked",
    "Content-Type": "application/json; charset=utf-8",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };
};

/* Funcao para logar */
const logar = function () {axios
  .post(`http://52.149.163.55:6161/api/authentication/login`, {
    idEmpresa:1,
    hashkey: "85853456",
    uid: "123456",
    password: "123456",
    versao: "0.0.3",
  })
  .then((response) => {
      setToken(response.data.token);
    return console.log("Certo: ", response);
  })
  .catch((error) => {
    console.log("Ops! Ocorreu um erro!!!:", error);
    alert("Ops! Ocorreu um erro!!!:", error);
})};

}

export default Api;