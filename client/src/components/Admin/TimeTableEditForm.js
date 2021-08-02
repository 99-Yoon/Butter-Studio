import { useState, useEffect } from "react";
import movieApi from "../../apis/movie.api.js";
import theaterApi from "../../apis/theater.api.js";
import timetableApi from "../../apis/timetable.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const INIT_INFO = {
    theater: 0,
    start: "",
    end: ""
}

const TimeTableEditForm = () => {
    const [movieList, setMovieList] = useState([])
    const [theaterList, setTheaterList] = useState([])
    const [selectId, setSelectId] = useState(0)
    const [selectMovie, setSelectMovie] = useState({})
    const [info, setInfo] = useState({ end_date: "" })
    const [selectInfo, setSelectInfo] = useState(INIT_INFO)
    const [showTimes, setShowTimes] = useState({ list: [] })
    const [error, setError] = useState("")

    useEffect(() => {
        getMoviesfromDB()
        getTheater()
    }, [])

    useEffect(() => {
        setSelectInfo({ ...selectInfo, ...INIT_INFO })
        setShowTimes({ list: [] })
    }, [selectId])

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

    function getDate(string) {
        const arr = string.split(':')
        const date = new Date(0, 0, 0, Number(arr[0]), Number(arr[1]))
        return date
    }

    function addRunTime(start, runTime) {
        const startArr = start.split(':')
        const add = Number(startArr[1]) + runTime

        let hours = Number(startArr[0]) + Math.floor(add / 60)
        if (Math.floor(hours / 24) > 0) hours = '0' + hours % 24
        else if (hours <= 9) hours = '0' + hours

        let mins = add % 60
        if (mins <= 9) mins = '0' + mins

        setSelectInfo({ ...selectInfo, "start": start, "end": hours + ':' + mins })
    }

    function addData() {
        const { list } = showTimes
        const isSelect = Object.values(selectInfo).every((el) => Boolean(el))
        if (isSelect) {
            const isTime = list.find(el => el.theaterTypeId === selectInfo.theater && (getDate(el.start) <= getDate(selectInfo.end) && getDate(el.end) >= getDate(selectInfo.start)))
            if (isTime) alert('이미 추가한 상영시간대입니다. 다른 시간대를 골라주시기 바랍니다.')
            else {
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
            }
        } else alert('추가할 데이터의 갯수가 부족합니다. 모든 항목을 입력해주시길 바랍니다.')
        setSelectInfo({ ...selectInfo, ...INIT_INFO })
    }

    function delData(index) {
        let { list } = showTimes
        list.splice(index, 1)
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
                setInfo({ ...info, end_date: "" })
            } else if (name === "end_date") {
                setInfo({ ...info, [name]: value })
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
        const timeArr = []
        try {
            setError("")
            showTimes.list.map(time => {
                timeArr.push({ theater: time.theaterTypeId, start: time.start, end: time.end })
            })
            const sendData = {
                movieId: selectMovie.id,
                title: selectMovie.title,
                release_date: selectMovie.release_date,
                runtime: selectMovie.runtime,
                theater: timeArr,
                date: info.end_date
            }
            await timetableApi.submit(sendData)
            alert("해당 상영시간표 정보 등록이 성공적으로 완료되었습니다.")
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                <input type="date" className={`form-control ${styles.shadowNone}`} id="end_date" name="end_date" value={info.end_date} min={selectMovie.release_date} onChange={handleChange} />
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