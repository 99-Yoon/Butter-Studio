import { useState, useEffect } from "react";
import moment from "moment";
import styles from "./calender.module.scss";

const DatePicker = ({ selectDate, setSelectDate, month }) => {
    const [week, setWeek] = useState([])

    useEffect(() => {
        generate()
    }, [month])

    function generate() {
        const weekly = []
        const startWeek = moment(month.cur).startOf('month').week()
        const endWeek = moment(month.cur).endOf('month').week() === 1 ? 53 : moment(month.cur).endOf('month').week()
        for (let week = startWeek; week <= endWeek; week++) {
            weekly.push(<tr key={week}>{
                Array(7).fill(0).map((n, i) => {
                    let current = moment(month.cur).clone().week(week).startOf('week').add(n + i, 'day')
                    let isSelected = moment(selectDate).format('YYYYMMDD') === current.format('YYYYMMDD') ? `${styles.selectDate}` : ''
                    let isColor = current.format('MM') !== moment(month.cur).format('MM') ? 'text-secondary ' : ((i === 0) ? "text-danger" : (i === 6) ? "text-primary" : "")

                    return <td className={`text-center p-1 ${styles.cursor}`} key={i} data-bs-dismiss="modal" onClick={() => setSelectDate(current.format('YYYY-MM-DD'))}>
                        <span className={`d-block ${isColor} ${isSelected}`}>{current.format('D')}</span>
                    </td>
                })}</tr>)
        }
        setWeek(weekly)
    }

    return (
        <tbody>{week.length !== 0 ? week.map(row => row) : ''}</tbody>
    )
}

export default DatePicker