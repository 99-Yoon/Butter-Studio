import axios from "axios";
import {baseUrl,TMDBUrl} from "../utils/baseUrl.js";

const getUpcomingfromTM = async () => {
    const { data } = await axios.get(`${TMDBUrl}/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`)
    return data.results
}
const getfromTM = async (cate) => {
    const category = cate
        const response = await axios.get(`${baseUrl}/api/movie/showmovie/${category}`)
        console.log(response.data)
        return response.data
}

const submit = async (movieId) => {
    const { data } = await axios.post(`${baseUrl}/api/movie/${movieId}`)
    console.log("data==",data)
}

const movieApi = {
    getUpcomingfromTM,
    getfromTM,
    submit
}

export default movieApi