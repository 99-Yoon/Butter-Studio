import axios from 'axios'
import sequelize from 'sequelize';
const { Op } = sequelize
import { Movie } from '../db/index.js'

const getMovieByCategory = async (req, res, next, category) => {
    try {
        console.log(category)
        const TMDBmovieIds = []
        const movieIds = []
        console.log(process.env.TMDB_APP_KEY)
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&page=1`)
        console.log(response.data)
        const TMDBmovies = response.data.results

        TMDBmovies.forEach(element => {
            TMDBmovieIds.push(element.id)
        })
        console.log(TMDBmovies)
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

const movieforAdmin = async (req, res) => {
    try {
        const TMDBmovieIds = []
        const TMDBmovies = req.TMDBmovies
        TMDBmovies.forEach(element => {
            TMDBmovieIds.push(element.id)
        })
        const findDirectorResult = await Promise.all(TMDBmovieIds.map(async (movieId) => {
            let newObj = { id: movieId, name: "" }
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
            const findDirectors = await data.crew.filter(element => element.job === "Director")
            if (findDirectors.length !== 0) {
                const name = findDirectors.reduce((acc, cur, idx) => {
                    if (idx !== 0) return acc + ', ' + cur.name
                    else return acc + cur.name}, '')
                newObj.name = name
            } else newObj.name = "없음"

            return newObj
        }))
        findDirectorResult.forEach(element => TMDBmovies.forEach(movie => { 
            if (element.id === movie.id) movie.director = element.name
        }))
        const responseAfterCompare = await Movie.findAll({
            where: {
                movieId: TMDBmovieIds
            },
            attributes: ['movieId']
        })
        responseAfterCompare.forEach(element => TMDBmovies.forEach((movie) => {
            if (movie.existed !== true && movie.id === element.movieId) movie.existed = true
            else if (movie.existed !== true) movie.existed = false
        }))
        return res.json(TMDBmovies)
    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오는 중 에러 발생")
    }
}

const getAllMovie = async (req, res, next) => {
    try {
        const { pageNum } = req.query
        const now = new Date()
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1)).toJSON().split(/T/)[0]
        // const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&region=KR&sort_by=release_date.asc&release_date.gte=${monthAgo}&page=${pageNum}`)
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&region=KR&sort_by=release_date.asc&release_date.gte=${monthAgo}&page=6`)
        req.TMDBmovies = response.data.results
        next()
    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오는 중 에러 발생")
    }
}

const getMovieList = async(req,res)=>{
    try {
        const movieList = await Movie.findAll()
        // console.log(movieList)
        const movieIds=[]
        movieList.forEach(el => {
            movieIds.push(el.movieId)
        })
        const elements = await Promise.all(
            movieIds.map(async (movieId) => {
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
                return movie.data
            })
        )  
        console.log(elements)
        res.json(elements)
    } catch (error) {
        console.log(error)
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

const findonlyTitle = async (req, res) => {
    try {
        const { keyword } = req.query
        const movieIds = []
        const { count, rows } = await Movie.findAndCountAll({
            where: {
                title: {
                    [Op.substring]: keyword
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

const findaboutAll = async (req, res, next) => {
    try {
        const { keyword } = req.query
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_APP_KEY}&language=kr-KR&query=${encodeURI(keyword)}&region=KR`)
        req.TMDBmovies = response.data.results
        next()
    } catch (error) {
        return res.status(500).send(error.message || "영화 검색 중 에러 발생");
    }
}

export default {
    getMovieByCategory,
    getMovieById,
    getAllMovie,
    getMovieList,
    create,
    remove,
    findonlyTitle,
    findaboutAll,
    movieforAdmin
}
