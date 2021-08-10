import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import HorizontalCalender from "../Calender/HorizontalCalender.js";
import timetableApi from "../../apis/timetable.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const TimeTable = ({ ticketInfo = { movieId: 0 }, setTicketInfo }) => {
    const [selectDate, setSelectDate] = useState(moment().format('YYYY-MM-DD'))
    const [timeList, setTimeList] = useState([])
    const [error, setError] = useState("")
    const history = useHistory()

    useEffect(() => {
        getTimeTable(selectDate, ticketInfo.movieId)
    }, [selectDate])

    useEffect(() => {
        getTimeTable(selectDate, ticketInfo.movieId)
    }, [ticketInfo.movieId])

    async function getTimeTable(selectDate, movieId) {
        try {
            setError("")
            const res = await timetableApi.getAll(selectDate, movieId)
            setTimeList(res)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function deleteTime(timeId) {
        try {
            setError("")
            await timetableApi.remove(timeId)
            alert('해당 상영시간표 정보를 성공적으로 삭제하였습니다.')
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleClick(time) {
        const date = new Date(time.start_time)
        let hours = date.getHours()
        let mins = date.getMinutes()

        if (hours <= 9) hours = '0' + hours
        if (mins <= 9) mins = '0' + mins

        setTicketInfo({
            ...ticketInfo,
            timetableId: time.id,
            time: time.date.split('T')[0] + " " + hours + ":" + mins,
            selectedTheater: time.theater.theaterName,
            theaterId: time.theaterId,
            partTime: time.partTime,
            week: time.week
        })
    }

    return (
        <>
            <HorizontalCalender selectDate={selectDate} setSelectDate={setSelectDate} />
            {timeList.length !== 0 ?
                timeList.map(el => <div className={"mt-4" + (/theater/g.test(history.location.pathname) ? " text-start" : "")}>
                    <h5 className="mb-0">{el.theaterName} 관 / <p className="d-inline fs-6 mb-0">{el.theaterTypeName}</p></h5>
                    {el.timetable.map(time => {
                        if (/ticket/g.test(history.location.pathname))
                            return <div className="d-inline-flex m-2">
                                <div className={`card text-dark ${styles.cursor}`} onClick={() => handleClick(time)}>
                                    <div className="card-body py-1"><img src={`${time.partTime === "morning" ? '/images/sun.svg' : time.partTime === "night" ? '/images/moon.svg' : '...'} `} style={{ width: '20px' }} alt="" />{moment(time.start_time).format('HH:mm')} ~ {moment(time.end_time).format('HH:mm')}</div>
                                    <div className="card-footer text-center py-1">{time.theater.rows * time.theater.columns - time.reservations} / {time.theater.rows * time.theater.columns}</div>
                                </div>
                            </div>
                        else return <div className="d-inline-flex flex-column m-2">
                            {/theater/g.test(history.location.pathname) ? null : <div className="d-flex justify-content-end">
                                <button type="button" className={`btn btn-dark btn-sm shadow-none ${styles.customBtn}`} onClick={() => deleteTime(time.id)}>X</button>
                            </div>}
                            <div className={"card" + (/theater/g.test(history.location.pathname) ? " text-dark" : "")}>
                                <div className="card-body py-1">{moment(time.start_time).format('HH:mm')} ~ {moment(time.end_time).format('HH:mm')}</div>
                                <div className="card-footer text-center py-1">{time.title}</div>
                            </div>
                        </div>
                    })}
                </div>)
                : <p className="text-center mt-5 mb-0">서버에 저장되어 있는 상영시간표가 존재하지 않습니다.</p>}
        </>
    )
}

export default TimeTable