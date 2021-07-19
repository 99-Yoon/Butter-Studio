import axios from "axios";
import { baseUrl, TMDBUrl } from "../utils/baseUrl";

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

const search = async (title) => {
    const payload = {
        params: {
            title: title
        }
    }
    const { data } = await axios.get(`${baseUrl}/api/movie/search`, payload)
    console.log("server recive==", data)
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