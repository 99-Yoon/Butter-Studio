import { useState } from 'react'
import TicketFeeTable from '../components/Admin/TicketFeeTable'
import TheaterInfo from '../components/TheaterInfo'

const TheaterPage = () => {
    const [state, setState] = useState(0)
    return (
        <div>

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
                    <div>상영시간표</div>
                </div>
                <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                    <div className="row justify-content-center">
                        <div className="col-sm-9 pb-5">
                            <TicketFeeTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheaterPage