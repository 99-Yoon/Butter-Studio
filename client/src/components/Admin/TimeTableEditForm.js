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
    const [theaterList, setTheaterList] = useState([])
    const [selectId, setSelectId] = useState(0)
    const [selectMovie, setSelectMovie] = useState({})
    const [selectInfo, setSelectInfo] = useState({ theater: 0, start: "", end: "" })
    const [showTimes, setShowTimes] = useState({ list: [] })
    const [sendInfo, setSendInfo] = useState(INIT_MOVIE)
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
            setTheaterList(res)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function addRunTime(start, runTime) {
        const startArr = start.split(':')
        const add = Number(startArr[1]) + runTime

        let hours = Number(startArr[0]) + Math.floor(add / 60)
        if (hours <= 9) hours = '0' + hours
        if (hours / 24 > 0) hours = '0' + hours % 24
        else if (hours <= 9) hours = '0' + hours

        let mins = add % 60
        if (mins <= 9) mins = '0' + mins
        setSelectInfo({ ...selectInfo, "start": start, "end": hours + ':' + mins })
    }

    function addData() {
        const { list } = showTimes
        const isSelect = Object.values(selectInfo).every((el) => Boolean(el))
        if (isSelect) {
            const theater = theaterList.find(theater => theater.theatertypeId === selectInfo.theater)
            if (theater) {
                const myTime = {
                    theaterTypeId: selectInfo.theater,
                    theaterName: theater.theaterName + '관 / ' + theater.theatertype.theaterTypeName,
                    start: selectInfo.start,
                    end: selectInfo.end
                }
                setShowTimes({ list: list.concat(myTime) })
            } else alert('선택한 상영관을 찾지 못했습니다. 다시 시도하길 바랍니다.')
        } else alert('추가할 데이터의 갯수가 부족합니다. 모든 항목을 입력해주시길 바랍니다.')
        setSelectInfo({ ...selectInfo, theater: 0, start: "", end: "" })
    }

    function delData(index) {
        let { list } = showTimes
        list = list.splice(index, 1)
        setShowTimes({ list: list })
    }

    async function handleChange(e) {
        try {
            setError("")
            const { name, value } = e.target
            if (name === "movieId") {
                setSelectId(value)
                const res = await movieApi.getMovieInfofromTM(value)
                setSelectMovie({ ...res })
                setSendInfo({ ...sendInfo, movieId: value, title: res.title, release_date: res.release_date, end_date: "" })
            } else if (name === "end_date") {
                setSendInfo({ ...sendInfo, [name]: value })
            } else if (name === "theater") {
                setSelectInfo({ ...selectInfo, [name]: Number(value) })
            } else if (name === "start") {
                addRunTime(value, selectMovie.runtime)
            } else setSelectInfo({ ...selectInfo, [name]: value })
        } catch (error) {
            catchErrors(error, setError)
        }

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
            {console.log("select==", showTimes)}
            <select className={`form-select mb-3 ${styles.shadowNone} ${styles.selectInput}`} id="movieId" name="movieId" value={selectId} onChange={handleChange} aria-label="select movie" defaultValue="0">
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
                <label htmlFor="release_date" className="form-label">상영시작일</label>
                <input type="text" className={`form-control ${styles.shadowNone}`} id="release_date" name="release_date" value={selectMovie?.release_date || ''} disabled />
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="end_date" className="form-label">상영종료일</label>
                <input type="date" className={`form-control ${styles.shadowNone}`} id="end_date" name="end_date" value={sendInfo.end_date} min={sendInfo.release_date} onChange={handleChange} />
            </div>
            <p>시간대 설정</p>
            <ul className="list-group list-group-flush">
                {showTimes.list.length !== 0 ?
                    showTimes.list.map((timeInfo, index) => <li className="list-group-item d-flex justify-content-between align-items-center">
                        {timeInfo.theaterName}&nbsp;&nbsp;&nbsp;{timeInfo.start} ~ {timeInfo.end}
                        <button type="button" className="btn btn-danger" onClick={() => delData(index)}>삭제</button>
                    </li>) : <li className="list-group-item text-center">추가된 시간대가 없습니다. 폼을 작성해 시간대를 추가해 주세요.</li>}
            </ul>
            <div>
                <div>
                    <select className={`form-select mb-3 ${styles.shadowNone} ${styles.selectInput}`} id="theater" name="theater" value={selectInfo.theater} onChange={handleChange} aria-label="select theater" defaultValue="0">
                        {theaterList.length !== 0 ?
                            theaterList.map((theater, index) => {
                                if (index === 0) return <>
                                    <option value="0" disabled>상영관을 선택해주십시오.</option>
                                    <option value={theater.theatertypeId}>{theater.theaterName}관 / {theater.theatertype.theaterTypeName}</option>
                                </>
                                else return <option value={theater.theatertypeId}>{theater.theaterName}관 / {theater.theatertype.theaterTypeName}</option>
                            })
                            : <option value="0" disabled>서버에 등록된 상영관이 없습니다.</option>}
                    </select>
                </div>
                <div>
                    <input type="time" id="start" name="start" value={selectInfo.start} onChange={handleChange} disabled={!selectId || !selectInfo.theater} />
                    <p>{(selectId && selectInfo.start !== "") ? "~ " + selectInfo.end : ""}</p>
                </div>
                <div>
                    <button type="button" className={`btn btn-dark ${styles.customBtn}`} onClick={addData}>추가</button>
                </div>
            </div>
            <div>
                <button type="submit" className={`btn btn-dark ${styles.customBtn}`}>등록</button>
            </div>
        </form>
    )
}

export default TimeTableEditForm