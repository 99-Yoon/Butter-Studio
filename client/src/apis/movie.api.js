import axios from "axios";
import { baseUrl, TMDBUrl } from "../utils/baseUrl.js";

const getAllfromTM = async (pageNum) => {
    const payload = {
        params: {
            pageNum
        }
    }
    const { data } = await axios.get(`${baseUrl}/api/movie/all`, payload)
    return data
}

const getMoviesfromTM = async (category) => {
    const response = await axios.get(`${baseUrl}/api/movie/showmovies/${category}`)
    return response.data
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

const getCreditsfromTM = async (id) =>{
    const movieId = id
    const response = await axios.get(`${TMDBUrl}/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    return response.data
}

const getVideosfromTM = async (id) =>{
    const movieId = id
    const response = await axios.get(`${TMDBUrl}/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    return response.data.results
}

const getListfromDB = async () => {
    const { data } = await axios.get(`${baseUrl}/api/movie`)
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

const search = async ({ type, keyword }, pageNum) => {
    const payload = {
        params: {
            keyword,
            pageNum
        }
    }
    const { data } = await axios.get(`${baseUrl}/api/movie/search/${type}`, payload)
    return data
}

const movieApi = {
    getAllfromTM,
    getMoviesfromTM,
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