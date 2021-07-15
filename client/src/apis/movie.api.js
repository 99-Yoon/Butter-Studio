import axios from "axios";
import { baseUrl, TMDBUrl } from "../utils/baseUrl";

const getUpcomingfromTM = async () => {
    const { data } = await axios.get(`${TMDBUrl}/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`)
    return data.results
}

const submit = async (movieId) => {
    const { data } = await axios.post(`${baseUrl}/api/movie/${movieId}`)
    console.log("data==",data)
}

const movieApi = {
    getUpcomingfromTM,
    submit
}

export default movieApi