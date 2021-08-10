import { useState, useEffect } from 'react'
import TheaterInfo from '../components/TheaterInfo'
import TimeTable from "../components/Admin/TimeTable"
import TicketFeeTable from '../components/Admin/TicketFeeTable'
import cinemaApi from "../apis/cinema.api.js"
import theaterApi from '../apis/theater.api.js'
import catchErrors from "../utils/catchErrors.js"

const TheaterPage = () => {
    const [theaterTypeList, setTheaterTypeList] = useState([])
    const [ticketFeeInfo, setTicketFeeInfo] = useState("")
    const [state, setState] = useState(0)
    const [selectTheater, setSelectTheater] = useState(0)
    const [error, setError] = useState("")

    useEffect(() => {
        getTicketFeeInfo()
        getTheaterType()
    }, [])

    async function getTheaterType() {
        try {
            setError("")
            const res = await theaterApi.getTheaterType()
            setTheaterTypeList(res)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function getTicketFeeInfo() {
        try {
            setError("")
            const res = await cinemaApi.getCinemaInfo()
            setTicketFeeInfo(res.moreFeeInfo)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="pb-5">
            <div>
                <ul className="nav nav-tabs justify-content-center my-4 border-0" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 0 ? "3px solid" : "none", borderBottomColor: state === 0 ? "#FEDC00" : "black" }} id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true" onClick={() => setState(0)}>극장정보</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 1 ? "3px solid" : "none", borderBottomColor: state === 1 ? "#FEDC00" : "black" }} id="stillcut-tab" data-bs-toggle="tab" data-bs-target="#stillcut" type="button" role="tab" aria-controls="stillcut" aria-selected="false" onClick={() => setState(1)}>상영시간표</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 2 ? "3px solid" : "none", borderBottomColor: state === 2 ? "#FEDC00" : "black" }} id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="false" onClick={() => setState(2)}>관람료</button>
                    </li>
                </ul>
            </div>
            <div className="tab-content text-center" id="myTabContent" style={{ color: "white" }}>
                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                    <TheaterInfo />
                </div>
                <div className="tab-pane fade" id="stillcut" role="tabpanel" aria-labelledby="stillcut-tab">
                    <div className="d-flex justify-content-center">
                        <div className="col-12 col-md-10 col-lg-9 px-3 px-md-0">
                            <TimeTable />
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                    <div className="d-flex justify-content-center">
                        <div className="col-sm-9 pb-5">
                            <nav aria-label="breadcrumb">
                                <ol className={"breadcrumb" + (theaterTypeList.length === 0 ? " d-flex justify-content-center" : "")}>
                                    {theaterTypeList.length !== 0 ? theaterTypeList.map(theater => <li className="breadcrumb-item" key={theater.id} onClick={() => setSelectTheater(theater.id)} style={{ cursor: "pointer" }}>{theater.theaterTypeName}</li>)
                                        : <li>등록된 관람료 관련 정보가 없습니다.</li>}
                                </ol>
                            </nav>
                            <TicketFeeTable selectTheater={selectTheater} />
                            <div className="text-start mt-5" style={{ whiteSpace: "pre-line" }}>{ticketFeeInfo}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheaterPage