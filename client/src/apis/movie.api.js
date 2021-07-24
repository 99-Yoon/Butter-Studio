import axios from "axios";
import { baseUrl, TMDBUrl } from "../utils/baseUrl.js";

const getUpcomingfromTM = async () => {
    const { data } = await axios.get(`${TMDBUrl}/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`)
    return data.results
}
const getMoviesfromTM = async (cate) => {
    const category = cate
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

const movieApi = {
    getUpcomingfromTM,
    getMoviesfromTM,
    getMovieInfofromTM,
    getImagesfromTM,
    getCreditsfromTM,
    getVideosfromTM,
    submit
}

export default movieApi