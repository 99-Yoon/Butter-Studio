import { useState, useEffect } from "react";
import moment from 'moment';
import HorizontalCalender from "../Calender/HorizontalCalender.js";
import timetableApi from "../../apis/timetable.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const TimeTable = () => {
    const [selectDate, setSelectDate] = useState(moment().format('YYYY-MM-DD'))
    const [timeList, setTimeList] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getTimeTable(selectDate)
    }, [selectDate])

    async function getTimeTable() {
        try {
            setError("")
            const res = await timetableApi.getAll(selectDate)
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
            getTimeTable(selectDate)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="col-12 col-lg-6 ms-lg-1 mb-5">
            <HorizontalCalender selectDate={selectDate} setSelectDate={setSelectDate} />
            {timeList.length !== 0 ?
                timeList.map(el => <div className="mt-4">
                    <h5 className="mb-0">{el.theaterName} 관 / <p className="d-inline fs-6 mb-0">{el.theatertype.theaterTypeName}</p></h5>
                    {el.timetable.map(time => <div className="d-inline-flex flex-column m-2">
                        <div className="d-flex justify-content-end">
                            <button type="button" className={`btn btn-dark btn-sm ${styles.customBtn}`} onClick={() => deleteTime(time.id)}>X</button>
                        </div>
                        <div className="card">
                            <div className="card-body py-1">{moment(time.start_time).format('HH:mm')} ~ {moment(time.end_time).format('HH:mm')}</div>
                            <div className="card-footer text-center py-1">{time.title}</div>
                        </div>
                    </div>)}
                </div>)
                : <p className="text-center mt-5 mb-0">서버에 저장되어 있는 상영시간표가 존재하지 않습니다.<br />아래의 양식을 작성해 새로운 상영시간표를 등록해주세요.</p>}
        </div>
    )
}

export default TimeTable