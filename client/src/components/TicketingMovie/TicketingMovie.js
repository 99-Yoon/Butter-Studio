import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "./ticketingMovie.module.scss"

const TicketingMovie = (props) => {
    const [movieList, setMovieList] = useState([])
    const [state, setState] = useState(0)
    useEffect(() => {
        getMovieList()

    }, [])

    async function getMovieList() {
        try {
            const response = await axios.get(`/api/movie/movielist`)
            console.log(response.data)
            setMovieList(response.data)
        } catch (error) {

        }
    }


    return (
        <div className={``} >
            <ul className="d-grid gap-2">
                {movieList.length > 0
                    ? movieList.map(movie => (
                        <li>
                            <button className={`${styles.btn}`} onClick={() => { props.setMovieInfo({ movieId: movie.id }) }}>
                                {movie.title}
                            </button>
                        </li>
                    ))
                    : <div>영화정보를 불러올 수 없습니다.</div>}
            </ul>
        </div>
    )
}

export default TicketingMovie