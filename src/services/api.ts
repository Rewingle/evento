import axios from "axios";

const baseUrl = "https://app.ticketmaster.com"
export const ticketmasterApi = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    //data: {ip: "192.168.0.1", device: "mac"},
    //headers: {token: "12345678ıukıyuıyusfsd"},
    //auth: {username: "", password: ""}
})