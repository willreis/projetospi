import axios from "axios";
import { useJwt } from "react-jwt";

export function logar() {
    const mountHeader = async () => {
        return {
            'cache-control': "no-cache",
            'Transfer-Encoding': "chunked",
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': "*/*",
            'Access-Control-Allow-Origin': "*",
            'Authorization': `Bearer ${(await useJwt()).data}`
        };
    }
    

    axios.post(`http://52.149.163.55:6161/api/authentication/login`, {
        headers: mountHeader
    })
        .then((response) => {

            return console.log("Certo: ", response)


        })
        .catch((error) => {
            console.log("Ops! Ocorreu um erro!!!:", error);
            alert("Ops! Ocorreu um erro!!!:", error);
        });



}
