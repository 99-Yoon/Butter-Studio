import { useState } from "react";
import styles from "./admin.module.scss";

const CinemaEdit = () => {
    const [cinemaInfo, setCinemaInfo] = useState({ cinema: "", transportation: "", parking: "", keyword: "", address: "" })
    const [search, setSearch] = useState("")

    function handleChange(e) {
        const { name, value } = e.target
        setCinemaInfo({ ...cinemaInfo, [name]: value })
    }

    return (
        <>
            <h2 className="border-bottom border-2 text-center pb-2 me-2">현재 영화관 정보</h2>
            <input type="text" className={`form-control mb-2 ${styles.shadowNone}`} id="cinema" name="cinema" onChange={handleChange} />
            <p>총 상영관 수: 8개관 | 총 좌석 수: 1,282석</p>
            <div className="mb-3">
                <label for="transportation" className="form-label">대중교통 안내</label>
                <textarea className={`form-control ${styles.shadowNone} ${styles.textarea}`} rows="7" id="transportation" name="transportation" onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label for="parking" className="form-label">자가용/주차안내</label>
                <textarea className={`form-control ${styles.shadowNone} ${styles.textarea}`} rows="7" id="parking" name="parking" onChange={handleChange}></textarea>
            </div>
            <label for="keyword" className="form-label">지도보기</label>
            <div className="input-group mb-3">
                <span className="input-group-text" id="address"><i className="bi bi-geo-alt-fill"></i></span>
                <input type="text" className={`form-control ${styles.shadowNone}`} id="address" name="address" aria-label="map" aria-describedby="address" onChange={handleChange} value={cinemaInfo.address} />
            </div>
        </>
    )
}
export default CinemaEdit