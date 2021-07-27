import { useState, useEffect } from "react";
import cinemaApi from "../../apis/cinema.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const INIT_TICKETFEE = {
    theaterType: "",
    weekdays: "",
    weekend: "",
    morning: "",
    day: "",
    night: "",
    youth: "",
    adult: "",
    senior: "",
    defaultPrice: 5000
}

const TicketEditForm = ({ editFee }) => {
    const [ticketFee, setTicketFee] = useState(INIT_TICKETFEE)
    const [error, setError] = useState("")

    useEffect(() => {
        setTicketFee({ ...ticketFee, ...editFee })
    }, [editFee])

    function handleChange(e) {
        const { name, value } = e.target
        setTicketFee({ ...ticketFee, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            await cinemaApi.editTicketFee(ticketFee)
            alert("해당 관람료 정보 등록이 성공적으로 완료되었습니다.")
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex mb-3">
                <label for="theaterType" className="col-form-label">상영관 종류</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="text" id="theaterType" name="theaterType" value={ticketFee.theaterType} onChange={handleChange} />
                </div>
                <label for="defaultPrice" className="col-form-label">기본 가격</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="defaultPrice" name="defaultPrice" value={ticketFee.defaultPrice} onChange={handleChange} />
                </div>
            </div>
            <div className="d-flex mb-3">
                <label for="weekdays" className="col-form-label">주중</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="weekdays" name="weekdays" value={ticketFee.weekdays} onChange={handleChange} />
                </div>
                <label for="weekend" className="col-form-label">주말</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="weekend" name="weekend" value={ticketFee.weekend} onChange={handleChange} />
                </div>
            </div>
            <div className="d-flex mb-3">
                <label for="morning" className="col-form-label">조조</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="morning" name="morning" value={ticketFee.morning} onChange={handleChange} />
                </div>
                <label for="day" className="col-form-label">일반</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="day" name="day" value={ticketFee.day} onChange={handleChange} />
                </div>
                <label for="night" className="col-form-label">심야</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="night" name="night" value={ticketFee.night} onChange={handleChange} />
                </div>
            </div>
            <div className="d-flex mb-3">
                <label for="youth" className="col-form-label">청소년</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="youth" name="youth" value={ticketFee.youth} onChange={handleChange} />
                </div>
                <label for="adult" className="col-form-label">일반</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="adult" name="adult" value={ticketFee.adult} onChange={handleChange} />
                </div>
                <label for="senior" className="col-form-label">경로</label>
                <div className="">
                    <input className={`form-control ${styles.shadowNone}`} type="number" id="senior" name="senior" value={ticketFee.senior} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit" className={`btn btn-dark ${styles.customBtn}`}>추가</button>
                </div>
            </div>
        </form>
    )
}

export default TicketEditForm