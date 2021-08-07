import axios from "axios";
import { baseUrl, TMDBUrl } from "../utils/baseUrl.js";

const getAllfromTM = async () => {
    const payload = {
        params: {
            pageNum: 1
        }
    }
    const { data } = await axios.get(`${baseUrl}/api/movie/all`, payload)
    return data
}

const getMovieInfofromTM = async (id) => {
    const movieId = id
    const response = await axios.get(`${TMDBUrl}/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`)
    return response.data
}

const getImagesfromTM = async (id) => {
    const movieId = id
    const response = await axios.get(`${TMDBUrl}/${movieId}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    return response.data
}

const getCreditsfromTM = async (id) => {
    const movieId = id
    const response = await axios.get(`${TMDBUrl}/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    return response.data
}

const getVideosfromTM = async (id) => {
    const movieId = id
    const response = await axios.get(`${TMDBUrl}/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    return response.data.results
}

const getListfromDB = async () => {
    const { data } = await axios.get(`${baseUrl}/api/movie`)
    return data
}
const getListByCategoryfromDB = async (category) => {
    const { data } = await axios.get(`${baseUrl}/api/movie/movielist/${category}`)
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
    getAllfromTM,
    getListByCategoryfromDB,
    getMovieInfofromTM,
    getImagesfromTM,
    getCreditsfromTM,
    getVideosfromTM,
    getListfromDB,
    submit,
    remove,
    search,
}

export default movieApi