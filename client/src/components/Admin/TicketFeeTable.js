import { useState, useEffect } from "react";
import cinemaApi from "../../apis/cinema.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const TicketFeeTable = ({ setEditFee, formRef }) => {
    const [ticketFee, setTicketFee] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getInfo()
    }, [])

    async function getInfo() {
        const res = await cinemaApi.getTicketFee()
        setTicketFee(res)
    }

    async function editRow(theaterType) {
        try {
            setError("")
            const res = await cinemaApi.getTicketFeeOne(theaterType)
            setEditFee({ ...res })
            formRef?.current.scrollIntoView({ behavior: "smooth", block: "center" })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function deleteData(theaterType) {
        try {
            setError("")
            await cinemaApi.removeTicketFee(theaterType)
            alert("해당 관람료 정보를 성공적으로 삭제했습니다.")
            getInfo()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <table className={`table caption-top text-center align-middle ${styles.tableForm}`}>
            <caption className="text-dark">영화관람료 안내</caption>
            <thead className={`table-dark ${styles.dNone}`}>
                <tr>
                    <th>상영관 종류</th>
                    <th>주중 / 주말</th>
                    <th>시간대</th>
                    <th>청소년</th>
                    <th>일반</th>
                    <th>경로</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {ticketFee.length !== 0 ? ticketFee.map(info =>
                    <>
                        <tr>
                            <td rowSpan="6" className={`d-block d-md-table-cell ${styles.Row} ${styles.type}`}>{info.theaterType}</td>
                            <td rowSpan="3" className={`d-block d-md-table-cell ${styles.Row} ${styles.moreData}`} data-label="- 청소년 / 성인 / 경로">주중(월~목)</td>
                            <td className="d-inline-block d-md-table-cell">조조 (06:00 ~ )</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.morning + info.youth + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.morning + info.adult + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.morning + info.senior + info.defaultPrice)}원</td>
                            <td rowSpan="6" className="d-none d-md-table-cell">
                                <div className="d-flex flex-column">
                                    <button type="button" className="btn btn-primary my-1" onClick={() => editRow(info.theaterType)}>수정</button>
                                    <button type="button" className="btn btn-danger my-1" onClick={() => deleteData(info.theaterType)}>삭제</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="d-inline-block d-md-table-cell">일반 (11:00 ~ )</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.day + info.youth + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.day + info.adult + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.day + info.senior + info.defaultPrice)}원</td>
                        </tr>
                        <tr>
                            <td className="d-inline-block d-md-table-cell">심야 (00:00 ~ )</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.night + info.youth + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.night + info.adult + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekdays + info.night + info.senior + info.defaultPrice)}원</td>
                        </tr>
                        <tr>
                            <td rowSpan="3" className={`d-block d-md-table-cell ${styles.Row} ${styles.moreData}`} data-label="- 청소년 / 성인 / 경로">주말(금~일) 및 공휴일</td>
                            <td className="d-inline-block d-md-table-cell">조조 (06:00 ~ )</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.morning + info.youth + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.morning + info.adult + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.morning + info.senior + info.defaultPrice)}원</td>
                        </tr>
                        <tr>
                            <td className="d-inline-block d-md-table-cell">일반 (11:00 ~ )</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.day + info.youth + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.day + info.adult + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.day + info.senior + info.defaultPrice)}원</td>
                        </tr>
                        <tr className={styles.Row}>
                            <td className="d-inline-block d-md-table-cell">심야 (00:00 ~ )</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.night + info.youth + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.night + info.adult + info.defaultPrice)}원</td>
                            <td className="d-inline-block d-md-table-cell">{priceToString(info.weekend + info.night + info.senior + info.defaultPrice)}원</td>
                            <td className={`d-block d-md-none ${styles.borderTop}`}>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-primary" onClick={() => editRow(info.theaterType)}>수정</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={() => deleteData(info.theaterType)}>삭제</button>
                                </div>
                            </td>
                        </tr>
                    </>)
                    : <tr>
                        <td colSpan="7">등록된 관람료 관련 정보가 없습니다.</td>
                    </tr>}
            </tbody>
        </table>
    )
}

export default TicketFeeTable