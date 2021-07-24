import { useState, useEffect } from "react";
import cinemaApi from "../../apis/cinema.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const INIT_CINEMAINFO = {
    cinemaName: "", 
    transportation: "", 
    parking: "", 
    address: "" 
}

const CinemaEdit = () => {
    const [cinemaInfo, setCinemaInfo] = useState(INIT_CINEMAINFO)
    const [error, setError] = useState("")

    useEffect(() => {
        getInfo()
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setCinemaInfo({ ...cinemaInfo, [name]: value })
    }

    async function getInfo() {
        try {
            setError("")
            const info = await cinemaApi.getInfo()
            if (info) setCinemaInfo(info)
            else setCinemaInfo(INIT_CINEMAINFO)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function handleSubmit() {
        try {
            setError("")
            await cinemaApi.edit(cinemaInfo)
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <>
            <h2 className="border-bottom border-2 text-center pb-2 me-2">현재 영화관 정보</h2>
            <div className="mb-3">
                <label for="cinemaName" className="form-label">영화관 이름</label>
                <input type="text" className={`form-control mb-2 ${styles.shadowNone}`} id="cinemaName" name="cinemaName" value={cinemaInfo.cinemaName} onChange={handleChange} />
                <p>총 상영관 수: 8개관 | 총 좌석 수: 1,282석</p>
            </div>
            <div className="mb-3">
                <label for="transportation" className="form-label">대중교통 안내</label>
                <textarea className={`form-control ${styles.shadowNone} ${styles.textarea}`} rows="7" id="transportation" name="transportation" value={cinemaInfo.transportation} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label for="parking" className="form-label">자가용/주차안내</label>
                <textarea className={`form-control ${styles.shadowNone} ${styles.textarea}`} rows="7" id="parking" name="parking" value={cinemaInfo.parking} onChange={handleChange}></textarea>
            </div>
            <label for="keyword" className="form-label">지도보기</label>
            <div className="input-group mb-3">
                <span className="input-group-text" id="address"><i className="bi bi-geo-alt-fill"></i></span>
                <input type="text" className={`form-control ${styles.shadowNone}`} id="address" name="address" value={cinemaInfo.address} onChange={handleChange} value={cinemaInfo.address} />
            </div>
            <div className="d-grid gap-2 mb-5">
                <button type="submit" className={`btn btn-dark shadow-none ${styles.customBtn}`} onClick={handleSubmit}>수정</button>
            </div>
        </>
    )
}
export default CinemaEdit