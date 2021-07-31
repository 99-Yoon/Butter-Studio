import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const getAll = async () => {
    const { data } = await axios.get(`${baseUrl}/api/theater`)
    return data
}

const getOne = async (theaterId) => {
    const { data } = await axios.get(`${baseUrl}/api/theater/${theaterId}`)
    return data
}

const getTheaterType = async () => {
    const { data } = await axios.get(`${baseUrl}/api/theater/type`)
    return data
}

const sendData = async (theater) => {
    const { data } = await axios.put(`${baseUrl}/api/theater`, theater)
    return data
}

const remove = async (theaterId) => {
    const { data } = await axios.delete(`${baseUrl}/api/theater/${theaterId}`)
    return data
}

const theaterApi = {
    getAll,
    getOne,
    getTheaterType,
    sendData,
    remove
}

export default theaterApi