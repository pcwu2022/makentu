import axios from "axios"; //前後端溝通所需套件
const instance = axios.create({
    baseURL: "http://localhost:3001/activities/",//所有request都是打到activities
    headers: {//告訴後端要傳json過去(可有可無)
        "Content-Type": "application/json",
    },
})
export default instance;