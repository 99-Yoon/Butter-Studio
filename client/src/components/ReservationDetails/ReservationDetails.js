import { useState, useEffect } from "react";
import reservationApi from "../../apis/reservation.api";
import styles from "./reservation-details.module.scss";
import moment from 'moment';

const ReservationDetails = () => {

    const [movies, setMovies] = useState([]);
    const findReservaion = async () => {
        const movieList = await reservationApi.findOneReservation();
        setMovies(movieList);
    }
    useEffect(() => {
        findReservaion();
    }, [])
    return (
        <div className={`d-flex flex-column align-items-center ${styles.width}`}>
            <div className={`${styles.header}`}>나의 예매 내역</div>
            {movies.length > 0
                ? movies.map(movie => (
                    <div className={`${styles.body}`}>
                        <div className={`d-flex justify-content-around align-items-center py-3`}>
                            <div className={`${styles.span} d-flex justify-content-center`}>
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className={`card-img-top rounded ${styles.poster}`} alt="Movie Poster" />
                            </div>
                            <div className={`${styles.span} d-flex flex-column`}>
                                <span className={`${styles.layout}`}>{movie.title}</span>
                                <span className={`${styles.layout}`}>{moment(movie.data).format('YYYY-MM-DD')}</span>
                                <span className={`${styles.layout}`}>{moment(movie.start_time).format('HH:mm')} ~ {moment(movie.end_time).format('HH:mm')}</span>
                                <span className={`${styles.layout}`}>{movie.theaterName}관</span>
                                <span className={`${styles.layout}`}>{ String.fromCharCode(movie.row + 64)}행 {movie.col}열</span>
                                <span className={`${styles.layout}`}>{movie.totalFee}원</span>
                                <span className={`${styles.layout}`}>{movie.payment}</span>
                            </div>
                        </div>
                    </div>
                ))
                : <div className={`${styles.layout}`}>예매 내역이 존재하지 않습니다.</div>}
        </div>
    )
}

export default ReservationDetails