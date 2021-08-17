import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const findReservedSeats = async (timeTable) => {
    const url = `${baseUrl}/api/reservation/findreservation`;
    const { data } = await axios.post(url, { timeTable: timeTable });
    return data
}

const findReservation = async () => {
    const url = `${baseUrl}/api/reservation/findreservation`;
    const { data } = await axios.get(url);
    return data
}

const findOneReservation = async () => {
    const url = `${baseUrl}/api/reservation/findonereservation`;
    const { data } = await axios.get(url);
    return data
}

const save = async (save) => {
    const url = `${baseUrl}/api/reservation/save`;
    const { data } = await axios.post(url, save);
    return data
}

const saveTid = async (tid) => {
    const url = `${baseUrl}/api/reservation/savetid`;
    const { data } = await axios.post(url, tid);
    return data
}

const deleteReservation = async () => {
    const url = `${baseUrl}/api/reservation/delete`;
    const { data } = await axios.get(url);
    return data
}

const reservationApi = {
    findReservation,
    findReservedSeats,
    findOneReservation,
    save,
    saveTid,
    deleteReservation
}
export default reservationApi