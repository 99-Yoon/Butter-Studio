import axios from 'axios'
import { Movie } from "../db/index.js";
import sequelize from 'sequelize';
const { Op } = sequelize

const comparePopularMovie = async (req, res) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
    const movies = response.data
    console.log('movies', movies)
    try {

    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오기 중 에러 발생");
    }
}

const getMovieByCategory = async (req, res, next, category) => {
    try {
        const TMDBmovieIds = []
        const movieIds = []
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&page=1`)
        const TMDBmovies = response.data.results
        TMDBmovies.forEach(element => {
            TMDBmovieIds.push(element.id)
        })
        const responseAfterCompare = await Movie.findAll({
            where: {
                movieId: {
                    [Op.or]: TMDBmovieIds
                }
            }
        })
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

const getAllMovie = async (req, res) => {
    try {
        const { pageNum } = req.query
        const TMDBmovieIds = []
        const now = new Date()
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1)).toJSON().split(/T/)[0]
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&region=KR&sort_by=release_date.asc&release_date.gte=${monthAgo}&page=${pageNum}`)
        const TMDBmovies = response.data.results
        TMDBmovies.forEach(element => {
            TMDBmovieIds.push(element.id)
        })
        const responseAfterCompare = await Movie.findAll({
            where: {
                movieId: TMDBmovieIds
            },
            attributes: ['movieId']
        })
        responseAfterCompare.forEach(element => TMDBmovies.find((movie) => {
            if (movie.existed !== true && movie.id === element.movieId) {
                movie.existed = true
            } else if (movie.existed !== true) movie.existed = false
        }))
        return res.json(TMDBmovies)
    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오는 중 에러 발생")
    }
}

const create = async (req, res) => {
    try {
        const { movieId } = req.params
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
        const newMovie = await Movie.create({ movieId: data.id, title: data.title, release_date: data.release_date })
        return res.json(newMovie)
    } catch (error) {
        return res.status(500).send(error.message || "영화 등록 중 에러 발생")
    }
}

const remove = async (req, res) => {
    try {
        const { movieId } = req.params
        const delMovie = await Movie.destroy({ where: { movieId: movieId } })
        return res.json(delMovie)
    } catch (error) {
        return res.status(500).send(error.message || "영화 삭제 중 에러 발생");
    }
}

const findforKeyword = async (req, res) => {
    try {
        const { title } = req.query
        const movieIds = []
        const { count, rows } = await Movie.findAndCountAll({
            where: {
                title: {
                    [Op.substring]: title
                }
            }
        });
        if (rows) {
            rows.forEach(movie => movieIds.push(movie.movieId))
            const elements = await Promise.all(
                movieIds.map(async (movieId) => {
                    const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
                    return movie.data
                })
            )
            return res.json({ count: movieIds.length, results: elements })
        } else return res.json({ count: count, results: rows })
    } catch (error) {
        return res.status(500).send(error.message || "영화 검색 중 에러 발생");
    }
}

export default {
    comparePopularMovie,
    getMovieByCategory,
    getMovieById,
    getAllMovie,
    create,
    remove,
    findforKeyword
}