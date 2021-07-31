import { useState, useEffect } from "react";
import theaterApi from "../../apis/theater.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const INIT_THEATER = {
    theaterName: "",
    theaterType: 0,
    rows: 1,
    columns: 1
}

const TheaterEditForm = ({ edit, formRef }) => {
    const [theater, setTheater] = useState(INIT_THEATER)
    const [types, setTypes] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getTypeList()
    }, [])

    useEffect(() => {
        setTheater({ ...theater, ...edit })
    }, [edit])

    async function getTypeList() {
        try {
            setError("")
            const resTypes = await theaterApi.getTheaterType()
            setTypes(resTypes)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setTheater({ ...theater, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            await theaterApi.sendData(theater)
            alert("해당 상영관 정보 등록이 성공적으로 완료되었습니다.")
            window.location.reload()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="d-flex justify-content-lg-between row row-cols-2 row-cols-lg-4 gx-0 gy-2 gy-lg-0 mb-2 mb-lg-3">
                <label htmlfor="theaterName" className="col-3 col-lg-auto col-form-label">상영관 이름</label>
                <div className="col-9 col-lg-4">
                    <input className={`form-control ${styles.shadowNone}`} id="theaterName" name="theaterName" type="text" value={theater.theaterName} onChange={handleChange} />
                </div>
                <label htmlfor="theaterType" className="col-3 col-lg-auto col-form-label text-lg-center">상영관 종류</label>
                <div className="col-9 col-lg-5">
                    <select className={`form-select ${styles.shadowNone} ${styles.selectInput}`} id="theaterType" name="theaterType" onChange={handleChange} aria-label="select theaterType" defaultValue={theater.theaterType}>
                        {types.length !== 0 ?
                            types.map((type, index) => {
                                if (index === 0) return <>
                                    <option value="0" disabled>상영관 종류를 선택해주십시오.</option>
                                    <option value={type.id}>{type.theaterType}</option>
                                </>
                                else return <option value={type.id}>{type.theaterType}</option>
                            })
                            : <option value="0" disabled>서버에 등록된 상영관 종류가 없습니다.</option>}
                    </select>
                </div>
            </div>
            <div className="d-flex flex-wrap row row-cols-2 gx-0 gy-2 gy-lg-0">
                <label htmlfor="seatInfo" className="col-3 col-lg-auto col-form-label me-lg-4">좌석 정보</label>
                <div className="d-flex col-9 col-sm-5">
                    <div className="col-3 col-lg-2">
                        <input className={`form-control ${styles.shadowNone}`} id="rows" name="rows" type="number" min="1" max="26" value={theater.rows} onChange={handleChange} />
                    </div>
                    <label htmlfor="rows" className="col-form-label mx-2">행</label>
                    <div className="col-3 col-lg-2">
                        <input className={`form-control ${styles.shadowNone}`} id="columns" name="columns" type="number" min="1" value={theater.columns} onChange={handleChange} />
                    </div>
                    <label htmlfor="columns" className="col-form-label mx-2">열</label>
                </div>
                <div className="col-12 col-sm-auto ms-sm-auto">
                    <button type="submit" className={`btn btn-dark w-100 ${styles.customBtn}`}>추가</button>
                </div>
            </div>
        </form>
    )
}

export default TheaterEditForm