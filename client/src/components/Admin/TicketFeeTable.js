import { useState, useEffect } from "react";
import cinemaApi from "../../apis/cinema.api.js";
import catchErrors from "../../utils/catchErrors.js";

const FeeTable = ({ editFee, setEditFee }) => {
    const [ticketFee, setTicketFee] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getInfo()
    }, [])

    async function getInfo() {
        const res = await cinemaApi.getTicketFee()
        console.log("res==", res)
    }

    async function editRow(theaterType) {
        try {
            setError("")
            const res = await cinemaApi.getTicketFeeOne(theaterType)
            setEditFee({ ...editFee, ...res })
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

    return (
            <table className="table caption-top text-center align-middle">
                <caption className="text-dark">영화관람료 안내</caption>
                <thead className="table-dark">
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
                    <tr>
                        <td rowSpan="6">일반석 2D</td>
                        <td rowSpan="3">주중(월~목)</td>
                        <td>조조 (06:00 ~ )</td>
                        <td>6,000원</td>
                        <td>8,000원</td>
                        <td>6,000원</td>
                        <td rowSpan="6">
                            <div className="d-flex flex-column">
                                <button type="button" className="btn btn-primary my-1" onClick={() => editRow("일반석 2D")}>수정</button>
                                <button type="button" className="btn btn-danger my-1" onClick={() => deleteData("일반석 2D")}>삭제</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>일반 (11:00 ~ )</td>
                        <td>9,000원</td>
                        <td>12,000원</td>
                        <td>9,000원</td>
                    </tr>
                    <tr>
                        <td>심야 (00:00 ~ )</td>
                        <td>5,000원</td>
                        <td>7,000원</td>
                        <td>5,000원</td>
                    </tr>
                    <tr>
                        <td rowSpan="3">주말(금~일) 및 공휴일</td>
                        <td>조조 (06:00 ~ )</td>
                        <td>6,000원</td>
                        <td>9,000원</td>
                        <td>6,000원</td>
                    </tr>
                    <tr>
                        <td>일반 (11:00 ~ )</td>
                        <td>10,000원</td>
                        <td>13,000원</td>
                        <td>10,000원</td>
                    </tr>
                    <tr>
                        <td>심야 (00:00 ~ )</td>
                        <td>5,000원</td>
                        <td>7,000원</td>
                        <td>5,000원</td>
                    </tr>
                </tbody>
            </table>
    )
}

export default FeeTable