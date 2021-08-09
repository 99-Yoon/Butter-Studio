import axios from 'axios'
import { Movie } from '../db/index.js'
import sequelize from 'sequelize'
const { Op } = sequelize

const getListfromDB = async (req, res) => {
    try {
        const findAll = await Movie.findAll({ attributes: ['movieId', 'title', 'release_date'] })
        res.json(findAll)
    } catch (error) {
        return res.status(500).send(error.message || "영화 목록 가져오기 중 에러 발생");
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
                    else return acc + cur.name
                }, '')
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
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR&region=KR&sort_by=release_date.asc&release_date.gte=${monthAgo}&page=${pageNum}`)
        req.TMDBmovies = response.data.results
        next()
    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오는 중 에러 발생")
    }
}

const getMovieById = async (req, res) => {
    try {
        const reservation = req.reservation
        const movieId = reservation.map(movie => movie.movieId);
        const elements = await Promise.all(
            movieId.map(async (movieId) => {
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
                const movieData = {
                    movieId : movie.data.id,
                    poster_path : movie.data.poster_path,
                    title : movie.data.title
                }
                return movieData
            })
        )
        reservation.map(reservation => {
            const movieId = elements.find(el => reservation.movieId === el.movieId ) 
            reservation.dataValues = {
                ...reservation.dataValues,
                poster_path: movieId.poster_path,
                title: movieId.title
            }
        });
        res.json(reservation);
    } catch (error) {
        return res.status(500).send(error.message || "영화 가져오기 중 에러 발생");
    }
}

const getMovieList = async (req, res) => {
    const { category } = req.params
    // console.log(category)
    try {
        const movieList = await Movie.findAll()
        const movieIds = []
        movieList.forEach(el => {
            movieIds.push(el.movieId)
        })
        const elements = await Promise.all(
            movieIds.map(async (movieId) => {
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`)
                const cols = await Movie.findOne({
                    where: { "movieId": movieId },
                    attributes: ["ticket_sales", "vote_average"]
                })
                const totalReservationRate = await Movie.findAll({
                    attributes: [[sequelize.fn('SUM', sequelize.col('ticket_sales')), 'totalReservationRate']]
                  });
                return { ...movie.data, ticket_sales: cols.ticket_sales, vote_average: cols.vote_average, totalReservationRate: totalReservationRate[0]}

            })
        )
        if (category === "popular") {
            for (let i = 0; i < elements.length; i++) {
                if (new Date(elements[i].release_date) > new Date()) {
                    elements.splice(i, 1);
                    i--;
                }
            }
            elements.sort(function (a, b) {
                return b.popularity - a.popularity
            })
            res.json(elements)
        } else if (category === "upcoming") {
            for (let i = 0; i < elements.length; i++) {
                if (new Date(elements[i].release_date) <= new Date()) {
                    elements.splice(i, 1);
                    i--;
                }
            }
            elements.sort(function (a, b) {
                return a.release_date - b.release_date
            })
            res.json(elements)
        } else {
            elements.sort(function (a, b) {
                return a.title - b.title
            })
            res.json(elements)
        }
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
                    const cols = await Movie.findOne({
                        where: { "movieId": movieId },
                        attributes: ["ticket_sales", "vote_average"]
                    })
                    const totalReservationRate = await Movie.findAll({
                        attributes: [[sequelize.fn('SUM', sequelize.col('ticket_sales')), 'totalReservationRate']]
                      });
                    return { ...movie.data, ticket_sales: cols.ticket_sales, vote_average: cols.vote_average, totalReservationRate: totalReservationRate[0]}
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
    getListfromDB,
    getAllMovie,
    getMovieById,
    getMovieList,
    create,
    remove,
    findonlyTitle,
    findaboutAll,
    movieforAdmin
}
