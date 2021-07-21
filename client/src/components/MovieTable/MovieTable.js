import { useState } from "react";
import movieApi from "../../apis/movie.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./movie-table.module.scss";

const MovieTable = ({ movieList }) => {
    const [error, setError] = useState("")

    async function handleSubmit(e, movieId) {
        e.preventDefault();
        try {
            setError("")
            await movieApi.submit(movieId)
            alert("서버 등록이 완료되었습니다.")
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function handleDelete(e, movieId) {
        e.preventDefault()
        try {
            setError("")
            await movieApi.remove(movieId)
            alert("해당 영화 정보가 서버에서 삭제되었습니다.")
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <table className={`table text-center align-middle ${styles.tableForm}`}>
            <thead className={`table-dark ${styles.dNone}`}>
                <tr>
                    <th className="col-md-5">제목</th>
                    <th className="col-md-4">감독</th>
                    <th className="col-md-3">상영일</th>
                </tr>
            </thead>
            <tbody>
                {movieList?.map(movie =>
                    <>
                        <tr className={styles.Row} data-bs-toggle="collapse" data-bs-target={"#movie" + movie.id}>
                            <td className="d-inline-block d-md-table-cell">{movie.title}</td>
                            <td className="d-none d-md-table-cell">{movie.director}</td>
                            <td className="d-none d-md-table-cell">{movie.release_date}</td>
                        </tr>
                        <tr className={styles.Row}>
                            <td colSpan="3" className="collapse" id={"movie" + movie.id}>
                                <div className={`d-inline-block d-md-none ${styles.word} mb-2`}>{movie.director} / {movie.release_date}</div>
                                <div className="d-flex justify-content-end">
                                    {movie.existed ? <button type="button" className="btn btn-danger" onClick={(e) => handleDelete(e, movie.id)}>삭제</button>
                                        : <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e, movie.id)}>등록</button>}
                                </div>
                            </td>
                        </tr>
                    </>)}
            </tbody>
        </table>
    )
}

export default MovieTable