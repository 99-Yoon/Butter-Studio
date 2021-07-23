import axios from "axios";
import baseUrl from "../utils/baseUrl.js";

const getfromTM = async (category) => {
    const response = await axios.get(`${baseUrl}/api/movie/showmovie/${category}`)
    return response.data
}

const getAllfromTM = async () => {
    const payload = {
        params: {
            pageNum: 1
        }
    }
    const { data } = await axios.get(`${baseUrl}/api/movie/all`, payload)
    return data
}

const submit = async (movieId) => {
    const { data } = await axios.post(`${baseUrl}/api/movie/${movieId}`)
    return data
}

const remove = async (movieId) => {
    const { data } = await axios.delete(`${baseUrl}/api/movie/${movieId}`)
    return data
}

const search = async ({ type, keyword }) => {
    const payload = {
        params: {
            keyword
        }
    }
    const { data } = await axios.get(`${baseUrl}/api/movie/search/${type}`, payload)
    return data
}

const movieApi = {
    getfromTM,
    getAllfromTM,
    submit,
    remove,
    search
}

export default movieApi