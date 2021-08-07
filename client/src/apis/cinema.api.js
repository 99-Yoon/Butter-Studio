import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const getCinemaInfo = async () => {
    const { data } = await axios.get(`${baseUrl}/api/info/cinema`)
    return data
}

const editCinema = async (cinemaInfo) => {
    const { data } = await axios.put(`${baseUrl}/api/info/cinema`, cinemaInfo)
    return data
}

const getTicketFee = async () => {
    const { data } = await axios.get(`${baseUrl}/api/info/ticketfee`)
    return data
}

const getTicketFeeOne = async (theatertypeId) => {
    const { data } = await axios.get(`${baseUrl}/api/info/ticketfee/${theatertypeId}`)
    return data
}

const editTicketFee = async (ticketFeeInfo) => {
    const { data } = await axios.put(`${baseUrl}/api/info/ticketfee`, ticketFeeInfo)
    return data
}

const removeTicketFee = async (theatertypeId) => {
    const { data } = await axios.delete(`${baseUrl}/api/info/ticketfee?theaterTypeId=${theatertypeId}`)
    return data
}

const cinemaApi = {
    getCinemaInfo,
    editCinema,
    getTicketFee,
    getTicketFeeOne,
    editTicketFee,
    removeTicketFee
}

export default cinemaApi