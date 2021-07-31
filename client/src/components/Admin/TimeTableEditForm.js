import { useState, useEffect } from "react";
import movieApi from "../../apis/movie.api.js";
import theaterApi from "../../apis/theater.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const INIT_MOVIE = {
    movieId: 0,
    title: "",
    release_date: "",
    end_date: "",
    theater: [],
    times: []
}

const TimeTableEditForm = () => {
    const [movieList, setMovieList] = useState([])
    const [theater, setTheater] = useState([])
    const [selectId, setSelectId] = useState(0)
    const [selectMovie, setSelectMovie] = useState({})
    const [selectTheater, setSelectTheater] = useState(0)
    const [sendMovie, setSendMovie] = useState(INIT_MOVIE)
    const [error, setError] = useState("")

    useEffect(() => {
        getMoviesfromDB()
        getTheater()
    }, [])

    async function getMoviesfromDB() {
        try {
            setError("")
            const res = await movieApi.getListfromDB()
            setMovieList(res)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function getTheater() {
        try {
            setError("")
            const res = await theaterApi.getAll()
            console.log("res==", res)
            setTheater(res)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function handleSelect(e) {
        const { name, value } = e.target
        if (name === "movieId") {
            setSelectId(value)
            const res = await movieApi.getMovieInfofromTM(value)
            setSelectMovie({ ...res })
            setSendMovie({ ...sendMovie, movieId: value, title: res.title, release_date: res.release_date })
        } else setSelectTheater(value)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setSendMovie({ ...sendMovie, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            alert("해당 상영시간표 정보 등록이 성공적으로 완료되었습니다.")
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {console.log("data==", sendMovie)}
            <select className={`form-select mb-3 ${styles.shadowNone} ${styles.selectInput}`} id="movieId" name="movieId" value={selectId} onChange={handleSelect} aria-label="select movie" defaultValue="0">
                {movieList.length !== 0 ?
                    movieList.map((movie, index) => {
                        if (index === 0) return <>
                            <option value="0" disabled>영화를 선택해주십시오.</option>
                            <option value={movie.movieId}>{movie.title}</option>
                        </>
                        else return <option value={movie.movieId}>{movie.title}</option>
                    })
                    : <option value="0" disabled>서버에 등록된 영화가 없습니다.</option>}
            </select>
            <div className="col-md-6 mb-3">
                <label for="release_date" className="form-label">상영시작일</label>
                <input type="text" className={`form-control ${styles.shadowNone}`} id="release_date" name="release_date" value={selectMovie.release_date} />
            </div>
            <div className="col-md-6 mb-3">
                <label for="end_date" className="form-label">상영종료일</label>
                <input type="date" className={`form-control ${styles.shadowNone}`} id="end_date" name="end_date" onChange={handleChange} />
            </div>
            <p>시간대 설정</p>
            <div>
                <div>
                    <select className={`form-select mb-3 ${styles.shadowNone} ${styles.selectInput}`} id="theater" name="theater" value={selectTheater} onChange={handleSelect} aria-label="select theater" defaultValue="0">
                        {theater.length !== 0 ?
                            theater.map((theater, index) => {
                                if (index === 0) return <>
                                    <option value="0" disabled>상영관을 선택해주십시오.</option>
                                    <option value={theater.theatertypeId}>{theater.theaterName}관 / {theater.theatertype.theaterTypeName}</option>
                                </>
                                else return <option value={theater.theatertypeId}>{theater.theaterName}관 / {theater.theatertype.theaterTypeName}</option>
                            })
                            : <option value="0" disabled>서버에 등록된 상영관이 없습니다.</option>}
                    </select>
                </div>
            </div>
        </form>
    )
}

export default TimeTableEditForm