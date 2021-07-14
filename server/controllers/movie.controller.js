import axios from 'axios'
import { Movie } from "../db/index.js";

const comparePopularMovie = async (req, res) => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1477348488076cafd4dcf973a314957d&language=ko-KR')
    const movies = response.data
    console.log('movies', movies)
    try {

    } catch (error) {

    }
}

const create = async (req, res) => {
    try {
        const { movieId } = req.params
        const newMovie = await Movie.create({ movieId: movieId });
        return res.json(newMovie);
    } catch (error) {
        return res.status(500).send(error.message || "영화 등록 중 에러 발생");
    }
}

export default {
    comparePopularMovie,
    create,
}