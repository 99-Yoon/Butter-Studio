import { useState, useEffect } from "react";
import theaterApi from "../../apis/theater.api.js";
import catchErrors from "../../utils/catchErrors.js";
import styles from "./admin.module.scss";

const TheaterTable = ({ setEdit, formRef }) => {
    const [theaterList, setTheaterList] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getTheaterList()
    }, [])

    async function getTheaterList() {
        try {
            setError("")
            const list = await theaterApi.getAll()
            setTheaterList(list)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function editTheater(theaterId) {
        try {
            setError("")
            const res = await theaterApi.getOne(theaterId)
            setEdit({ ...res })
            formRef?.current.scrollIntoView({ behavior: "smooth", block: "center" })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function deleteTheater(theaterId) {
        try {
            setError("")
            await theaterApi.remove(theaterId)
            alert("해당 상영관 정보를 성공적으로 삭제했습니다.")
            getTheaterList()
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <table className={`table text-center align-middle ${styles.tableForm}`}>
            <thead className={`table-dark align-middle ${styles.dNone}`}>
                <tr>
                    <th>상영관 이름</th>
                    <th>상영관 종류</th>
                    <th>좌석 정보</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {theaterList.length !== 0 ? theaterList.map(info =>
                    <tr>
                        <td>{info.theaterName}관</td>
                        <td>{info.theatertype.theaterTypeName}</td>
                        <td>{info.rows}행 {info.columns}열<br />총 {info.rows*info.columns}석</td>
                        <td>
                            <div className="d-flex flex-column">
                                <button type="button" className="btn btn-primary my-1" onClick={() => editTheater(info.id)}>수정</button>
                                <button type="button" className="btn btn-danger my-1" onClick={() => deleteTheater(info.id)}>삭제</button>
                            </div>
                        </td>
                    </tr>)
                    : <tr>
                        <td colSpan="4">등록된 상영관 정보가 없습니다.</td>
                    </tr>}
            </tbody>
        </table>
    )
}

export default TheaterTable