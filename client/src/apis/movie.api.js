import axios from "axios";
import { baseUrl, TMDBUrl } from "../utils/baseUrl";

const getfromTM = async (category) => {
    const response = await axios.get(`${baseUrl}/api/movie/showmovie/${category}`)
    return response.data
}

const submit = async (movieId) => {
    const { data } = await axios.post(`${baseUrl}/api/movie/${movieId}`)
    console.log("data==", data)
}

const movieApi = {
    getfromTM,
    submit
}

export default movieApi