import { useState, useRef } from "react";
import TheaterTable from "./TheaterTable";
import TheaterEditForm from "./TheaterEditForm";

const TheaterEdit = () => {
    const [edit, setEdit] = useState({})
    const formRef = useRef(null)

    return (
        <>
            <h2 className="border-bottom border-2 text-center pb-2 me-2">현재 상영관 정보</h2>
            <TheaterTable setEdit={setEdit} formRef={formRef} />
            <h5 className="mb-3">상영관 정보 설정</h5>
            <TheaterEditForm edit={edit} formRef={formRef} />
        </>
    )
}
export default TheaterEdit