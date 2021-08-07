import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "./ticketingMovie.module.scss"
import movieApi from '../../apis/movie.api'
import catchErrors from '../../utils/catchErrors'

const TicketingMovie = ({ticketInfo, setTicketInfo}) => {
    const [movieList, setMovieList] = useState([])
    const [error, setError] = useState()
    useEffect(() => {
        getMovieList()
    }, [])

    async function getMovieList() {
        try {
            const response = await movieApi.getListByCategoryfromDB()
            console.log(response)
            setMovieList(response)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleClick(event) {
        console.log(event.target.name)
        setTicketInfo({...ticketInfo, movieId: event.target.name })
    }

    return (
        <div >
            {console.log(ticketInfo.movieId)}
            <div className="d-grid gap-2">
                {movieList.length > 0
                    ? movieList.map(movie => (
                        <button name={movie.id} className={`${ticketInfo.movieId == movie.id ? styles.on : styles.btn}`} onClick={handleClick}>
                            {movie.title}
                        </button>
                    ))
                    : <div>영화정보를 불러올 수 없습니다.</div>}
            </div>
        </div>
    )
}

export default TicketingMovie