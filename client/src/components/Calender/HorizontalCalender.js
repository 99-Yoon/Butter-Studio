import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import DatePicker from "./DatePicker.js";
import styles from "./calender.module.scss";

const Calender = ({ selectDate, setSelectDate }) => {
    const [dateList, setDateList] = useState([])
    const [dateArr, setDateArr] = useState([])
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [weekly, setWeekly] = useState([])
    const [week, setWeek] = useState(["일", "월", "화", "수", "목", "금", "토"])
    const [month, setMonth] = useState({ pre: moment(selectDate).subtract(1, 'months').format('YYYY-MM'), cur: moment(selectDate).format('YYYY-MM'), next: moment(selectDate).add(1, 'months').format('YYYY-MM') })
    const history = useHistory()

    useEffect(() => {
        setMonth({ ...month, pre: moment(selectDate).subtract(1, 'months').format('YYYY-MM'), cur: moment(selectDate).format('YYYY-MM'), next: moment(selectDate).add(1, 'months').format('YYYY-MM') })
        getDate(selectDate)
        getWeek(selectDate)
    }, [selectDate])

    function getWeek(oneDay) {
        let dateArr = []
        dateArr = Array(7).fill(0).map((n, i) => {
            let current = moment(oneDay).add((n + i), 'days')
            return <div className="col-auto align-self-end text-center" onClick={() => setSelectDate(current.format('YYYY-MM-DD'))}>
                {current.isSame(oneDay) || current.format("DD") === "01" ? <strong className={styles.yearmonth}>{current.format('YYYY.MM')}</strong> : ""}
                <div className={`d-flex flex-column ${styles.cursor} ` + ((current.format("d") === "0" || current.format("d") === "6") ? ((current.format("d") === "0") ? "text-danger" : "text-primary") : "")}>
                    <strong className={current.isSame(oneDay) ? (/admin/g.test(history.location.pathname) ? styles.selectDate : styles.selectatHome) : ""}>{current.format('DD')}</strong>
                    <strong>{current.isSame(moment().format('YYYY-MM-DD')) ? "오늘" : week[Number(current.format("d"))]}</strong>
                </div>
            </div>
        })
        console.log("Dadsa--===", dateArr)
        setWeekly(dateArr)
    }

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
            <div className={`d-flex flex-column ${styles.cursor} ` + ((Number(el.day) === 0 || Number(el.day) === 6) ? ((Number(el.day) === 0) ? "text-danger" : "text-primary") : "")}>
                <strong className={moment(el.date).isSame(oneDay) ? (/admin/g.test(history.location.pathname) ? styles.selectDate : styles.selectatHome) : ""}>{moment(el.date).format('DD')}</strong>
                <strong>{moment(el.date).isSame(moment().format('YYYY-MM-DD')) ? "오늘" : week[el.day]}</strong>
            </div>
        </div>)
        setDateList(resultArr)
    }

    function preWeek() {
        const preDate = moment(date).week()
        console.log("week==",preDate)
        // let dateArr = []
        // dateArr = Array(7).fill(0).map((n, i) => {
        //     let current = moment(oneDay).add((n + i), 'days')
        //     return <div className="col-auto align-self-end text-center" onClick={() => setSelectDate(current)}>
        //         {current.isSame(oneDay) || current.format("DD") === "01" ? <strong className={styles.yearmonth}>{current.format('YYYY.MM')}</strong> : ""}
        //         <div className={`d-flex flex-column ${styles.cursor} ` + ((current.format("d") === "0" || current.format("d") === "6") ? ((current.format("d") === "0") ? "text-danger" : "text-primary") : "")}>
        //             <strong className={current.isSame(oneDay) ? styles.selectDate : ""}>{current.format('DD')}</strong>
        //             <strong>{current.isSame(oneDay) ? "오늘" : week[Number(current.format("d"))]}</strong>
        //         </div>
        //     </div>
        // })
        // console.log("Dadsa--===", dateArr)
        // setWeekly(dateArr)
    }

    function nextWeek() {

    }

    return (
        <>
            {console.log("date==", selectDate)}
            <div className="d-flex position-relative border-bottom border-dark border-2 p-3">
                <i className={`bi bi-calendar2 position-absolute top-0 ${styles.calender} ${styles.cursor}`} data-bs-toggle="modal" data-bs-target="#calenderModal"></i>
                <div className="modal" id="calenderModal" tabindex="-1" aria-labelledby="calenderModal" aria-hidden="true">
                    <div className={`modal-dialog position-absolute bg-white ${styles.datepicker}`}>
                        <div className="modal-content">
                            <div className="modal-body px-1 pt-1 pb-0">
                                <div className="d-flex justify-content-between bg-dark rounded py-1">
                                    <i className={`bi bi-chevron-left align-self-center text-center text-white ${styles.cursor}`} onClick={() => setMonth({ ...month, pre: moment(month.pre).subtract(1, 'months').format('YYYY-MM'), cur: month.pre, next: month.cur })}></i>
                                    <div className="text-white">{moment(month.cur).format('YYYY년 MM월')}</div>
                                    <i className={`bi bi-chevron-right align-self-center text-center text-white ${styles.cursor}`} onClick={() => setMonth({ ...month, pre: month.cur, cur: month.next, next: moment(month.next).add(1, 'months').format('YYYY-MM') })}></i>
                                </div>
                                <table className="table mb-0">
                                    <thead>
                                        <tr>{week.map(day => <th>{day}</th>)}</tr>
                                    </thead>
                                    <DatePicker selectDate={selectDate} setSelectDate={setSelectDate} month={month} />
                                    <tfoot>
                                        <tr>
                                            <td colSpan="7" align="center"><button type="button" className={`btn btn-dark btn-sm shadow-none ${styles.customBtn}`} data-bs-dismiss="modal" onClick={() => setSelectDate(moment().format('YYYY-MM-DD'))}>오늘</button></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <i className={`col-1 bi bi-chevron-left align-self-center text-center ${styles.cursor}`} onClick={preWeek}></i>
                <div className={`d-flex justify-content-between col-10 ${styles.box}`}>{dateList.map(el => el)}</div>
                <i className={`col-1 bi bi-chevron-right align-self-center text-center ${styles.cursor}`} onClick={nextWeek}></i>
            </div>
        </>
    )
}

export default Calender