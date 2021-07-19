import axios from 'axios'
import { Movie } from "../db/index.js";
import sequelize from 'sequelize';
const { Op } = sequelize

const comparePopularMovie = async (req, res) => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1477348488076cafd4dcf973a314957d&language=ko-KR')
    const movies = response.data
    console.log('movies', movies)
    try {

    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오기 중 에러 발생");
    }
}

const getMovieByCategory = async (req, res, next, category) => {
    const responsePopular = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&page=1`)
    const TMDBmovies = responsePopular.data.results
    const TMDBmovieIds = []
    TMDBmovies.forEach(element => {
        TMDBmovieIds.push(element.id)
    });
    console.log(TMDBmovieIds)
    try {
        const responseAfterCompare = await Movie.findAll({
            where: {
                movieId: {
                    [Op.or]: TMDBmovieIds
                }
            }
        })
        const movieIds = []
        responseAfterCompare.forEach(el => {
            movieIds.push(el.movieId)
        })
        console.log('movieIds=', movieIds)
        req.movieIds = movieIds
        next()
    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오기 중 에러 발생");
    }
}

const getMovieById = async (req, res) => {
    try {
        const movieIds = req.movieIds
        console.log(movieIds)
        const elements = await Promise.all(
            movieIds.map(async (movieId) => {
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
                return movie.data
            })
        )  
        console.log(elements)
        res.json(elements)
    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오기 중 에러 발생");
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
    getMovieByCategory,
    getMovieById,
    create,
}