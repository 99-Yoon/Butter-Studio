import axios from "axios";
import {baseUrl} from "../utils/baseUrl.js";

const getInfo = async () => {
    const { data } = await axios.get(`${baseUrl}/api/cinema`)
    return data
}

const edit = async (cinemaInfo) => {
    const { data } = await axios.put(`${baseUrl}/api/cinema`, cinemaInfo)
    return data
}

const cinemaApi = {
    getInfo,
    edit
}

export default cinemaApi