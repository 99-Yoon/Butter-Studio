import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "./ticketingMovie.module.scss"

const TicketingMovie = (props) => {
    const [movieList, setMovieList] = useState([])
    useEffect(() => {
        getMovieList()

    }, [])

    async function getMovieList() {
        try {
            const response = await axios.get(`/api/movie/movielist`)
            setMovieList(response.data)
        } catch (error) {

        }
    }

    function handleClick(event) {
        console.log(event.target.name)
        props.setTicketInfo({ movieId: event.target.name })
    }

    return (
        <div >
            {console.log(props.ticketInfo.movieId)}
            <div className="d-grid gap-2">
                {movieList.length > 0
                    ? movieList.map(movie => (
                        <button name={movie.id} className={`${props.ticketInfo.movieId == movie.id ? styles.on : styles.btn}`} onClick={handleClick}>
                            {movie.title}
                        </button>
                    ))
                    : <div>영화정보를 불러올 수 없습니다.</div>}
            </div>
        </div>
    )
}

export default TicketingMovie