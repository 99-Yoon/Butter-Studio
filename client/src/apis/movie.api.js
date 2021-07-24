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
const getMoviesfromTM = async (category) => {
    console.log(category)
    const response = await axios.get(`${baseUrl}/api/movie/showmovies/${category}`)
    console.log(response.data)
    return response.data
}
const getMovieInfofromTM = async (id) => {
    const movieId = id
    const response = await axios.get(`${TMDBUrl}/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`)
    console.log(response.data)
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

const submit = async (movieId) => {
    const { data } = await axios.post(`${baseUrl}/api/movie/${movieId}`)
    console.log("data==", data)
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
    getMoviesfromTM,
    getMovieInfofromTM,
    getImagesfromTM,
    getCreditsfromTM,
    getVideosfromTM,
    submit,
    remove,
    search,
}

export default movieApi