import axios from 'axios'
import sequelize from 'sequelize';
const { Op } = sequelize
import { Movie } from '../db/index.js'

const comparePopularMovie = async (req, res) => {
    const responsePopular = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
    const movies = responsePopular.data.results
    const movieIds = []
    movies.forEach(element => {
        movieIds.push(element.id)
    });
    console.log(movieIds)
    try {
        const responseAfterCompare = await Movie.findAll({
            where: {
                movieId: {
                    [Op.or]: movieIds
                }
            }
        })
        const popularMovieIds = []
        responseAfterCompare.forEach(el => {
            popularMovieIds.push(el.movieId)
        })
        console.log('popularMovieIds=', popularMovieIds)
        const m = await Promise.all(
            popularMovieIds.map(async(el) => {
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${el}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
                return movie.data
            })
        )
        res.json(m)
    } catch (error) {
        console.log(error)
    }
}

const upcommingMovie = async (req, res) => {
    const responsePopular = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&page=1`)
    const movies = responsePopular.data.results
    const movieIds = []
    movies.forEach(element => {
        movieIds.push(element.id)
    });
    console.log(movieIds)
    try {
        const responseAfterCompare = await Movie.findAll({
            where: {
                movieId: {
                    [Op.or]: movieIds
                }
            }
        })
        const popularMovieIds = []
        responseAfterCompare.forEach(el => {
            popularMovieIds.push(el.movieId)
        })
        console.log('popularMovieIds=', popularMovieIds)
        const m = await Promise.all(
            popularMovieIds.map(async(el) => {
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${el}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
                return movie.data
            })
        )
        res.json(m)
    } catch (error) {
        console.log(error)
    }
}

<<<<<<< HEAD
export default { comparePopularMovie, upcommingMovie }
=======
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
>>>>>>> kimpen
