import { useState, useEffect } from "react";
import moment from "moment";
import styles from "./calender.module.scss";

const Calender = ({ selectDate, setSelectDate }) => {
    const [dateList, setDateList] = useState([])
    const [week, setWeek] = useState(["일", "월", "화", "수", "목", "금", "토"])

    useEffect(() => {
        getDate(selectDate)
    }, [])

    function getDate(oneDay) {
        let dateArr = []
        let lastWeek = moment(oneDay).subtract(7, 'days')
        const nextWeek = moment(oneDay).add(7, 'days')
        while (lastWeek.isBefore(nextWeek)) {
            dateArr.push({ date: lastWeek.format('YYYY-MM-DD'), day: lastWeek.format('d') })
            lastWeek.add(1, 'days')
        }
        console.log("arr=", dateArr)
        console.log("same==", moment(oneDay).isSame('2021-08-07'))
        const resultArr = dateArr.map(el => <div onClick={() => setSelectDate(el.date)}>
            {moment(el.date).isSame(oneDay) || el.date.split('-')[2] === "01" ? <strong>{moment(el.date).format('YYYY.MM')}</strong> : ""}
            <div>
                <strong>{moment(el.date).format('DD')}</strong>
                <em>{moment(el.date).isSame(oneDay) ? "오늘" : week[el.day]}</em>
            </div>
        </div>)
        setDateList(resultArr)
    }

    return (
        <>
            {console.log("date==", selectDate)}
            <div>
                <i className="bi bi-chevron-left"></i>
                {dateList.map(el => el)}
                <i className="bi bi-chevron-right"></i>
            </div>
        </>
    )
}

export default Calender