import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const findReservedSeats = async (timeTable) => {
    const url = `${baseUrl}/api/reservation/findreservation`;
    const { data } = await axios.post(url, timeTable);
    return data
}

const findReservation = async () => {
    const url = `${baseUrl}/api/reservation/findreservation`;
    const { data } = await axios.get(url);
    return data
}

const findOneReservation = async () => {
    console.log("여기여기2");
    const url = `${baseUrl}/api/reservation/findonereservation`;
    const { data } = await axios.get(url);
    return data
}

const save = async (save) => {
    const url = `${baseUrl}/api/reservation/save`;
    const { data } = await axios.post(url, save);
    return data

}
const reservationApi = { 
    findReservation,
    findReservedSeats,
    findOneReservation,
    save
}
export default reservationApi