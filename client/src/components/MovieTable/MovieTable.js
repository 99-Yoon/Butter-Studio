import { useState } from "react";
import movieApi from "../../apis/movie.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./movie-table.module.scss";

const MovieTable = ({ movieList }) => {
    const [error, setError] = useState("")

    async function handleClick(e, movieId) {
        e.preventDefault();
        try {
            setError("");
            await movieApi.submit(movieId)
            alert("서버 등록이 완료되었습니다.")
        } catch (error) {
            catchErrors(error, setError);
        }
    }

    return (
        <table className={`table text-center ${styles.tableForm}`}>
            <thead className={`table-dark ${styles.dNone}`}>
                <tr>
                    <th>제목</th>
                    <th>감독</th>
                    <th>상영일</th>
                    <th>줄거리</th>
                    <th>포스터</th>
                    <th>스틸컷</th>
                    <th>예고편</th>
                </tr>
            </thead>
            <tbody>
                {movieList?.map(movie =>
                    <>
                        <tr className={styles.Row} data-bs-toggle="collapse" data-bs-target={"#movie" + movie.id}>
                            <td className="d-inline-block d-md-table-cell">{movie.title}</td>
                            <td data-label="- " className={`d-inline-block d-md-table-cell ${styles.data}`}>케이트 쇼트랜드</td>
                            <td data-label="/ " className={`d-inline-block d-md-table-cell ${styles.data}`}>{movie.release_date}</td>
                            <td className="d-none d-md-table-cell">{movie.overview !== '' ? 'O' : 'X'}</td>
                            <td className="d-none d-md-table-cell">{movie.poster_path !== '' ? 'O' : 'X'}</td>
                            <td className="d-none d-md-table-cell">{movie.backdrop_path !== '' ? 'O' : 'X'}</td>
                            <td className="d-none d-md-table-cell">{movie.video !== false ? 'O' : 'X'}</td>
                        </tr>
                        <tr className={styles.Row}>
                            <td colSpan="7" className="collapse" id={"movie" + movie.id}>
                                <div className={`d-inline-block d-md-none ${styles.word} mb-2`}>
                                    줄거리 - {movie.overview !== '' ? 'O' : 'X'} /
                                    포스터 - {movie.poster_path !== '' ? 'O' : 'X'} /
                                    스틸컷 - {movie.backdrop_path !== '' ? 'O' : 'X'} /
                                    예고편 - {movie.video !== false ? 'O' : 'X'}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-primary" onClick={(e) => handleClick(e, movie.id)}>등록</button>
                                    {/* <button type="button" className="btn btn-danger">삭제</button> */}
                                </div>
                            </td>
                        </tr>
                    </>)}
            </tbody>
        </table>
    )
}

export default MovieTable