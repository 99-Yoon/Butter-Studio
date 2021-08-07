import { useState, useEffect } from "react";
import moment from 'moment';
import Calender from "../Calender/Calender.js";
import timetableApi from "../../apis/timetable.api.js";
import catchErrors from "../../utils/catchErrors.js";

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

    async function deleteTime() {
        try {
            setError("")
            await timetableApi.remove()
            alert('해당 상영시간표 정보를 성공적으로 삭제하였습니다.')
            getTimeTable(selectDate)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="col-12 col-lg-6">
            {console.log("list==", timeList)}
            <Calender selectDate={selectDate} setSelectDate={setSelectDate} />
            {timeList.length !== 0 ?
                timeList.map(el => <>
                    <h5>{el.theaterName} 관</h5>
                    {/* {arr = el.timetable.map(time => <div className="card">
                        <div className="card-body">{moment(time.start_time, 'hh:mm')} ~ {moment(time.end_time, 'hh:mm')}</div>
                    </div>
                    )
                    } */}
                    {/* {el.timetable.map(time => {
                        if (el.id === time.id) return <div className="card">
                        <div className="card-body">{moment(time.start_time, 'hh:mm')} ~ {moment(time.end_time, 'hh:mm')}</div>
                    </div>
                    })} */}
                </>)
                : <></>}
        </div>
    )
}

export default TimeTable