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
        const resultArr = dateArr.map(el => <div className="col-2 align-self-end text-center" onClick={() => setSelectDate(el.date)}>
            {moment(el.date).isSame(oneDay) || el.date.split('-')[2] === "01" ? <strong className={styles.yearmonth}>{moment(el.date).format('YYYY.MM')}</strong> : ""}
            <div className={"d-flex flex-column " + ((Number(el.day) === 0 || Number(el.day) === 6) ? ((Number(el.day) === 0) ? "text-danger" : "text-primary") : "")}>
                <strong className={moment(el.date).isSame(oneDay) ? styles.selectDate : ""}>{moment(el.date).format('DD')}</strong>
                <strong>{moment(el.date).isSame(oneDay) ? "오늘" : week[el.day]}</strong>
            </div>
        </div>)
        setDateList(resultArr)
    }

    return (
        <>  
            {console.log("date==", selectDate)}
            <div className="d-flex position-relative border-bottom border-dark border-2 p-3">
                <i className={`bi bi-calendar2 position-absolute top-0 ${styles.calender}`}></i>
                <i className="col-1 bi bi-chevron-left align-self-center text-center"></i>
                <div className={`d-flex col-10 ${styles.box}`}>{dateList.map(el => el)}</div>
                <i className="col-1 bi bi-chevron-right align-self-center text-center"></i>
            </div>
        </>
    )
}

export default Calender