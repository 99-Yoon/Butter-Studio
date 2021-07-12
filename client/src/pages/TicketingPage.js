import React from 'react'
import TicketingMovie from "../components/TicketingMovie/TicketingMovie"
import TicketingTheater from "../components/TicketingTheater"
import TicketingTimeTable from "../components/TicketingTimeTable"

const TicketingPage = () => {
    return (
        <div style={{ backgroundColor: "black" }}>
            <div className="row justify-content-center my-5">
                <div className="col-sm-4">
                    <h2 className="py-2 text-white text-center" style={{borderTop:"3px solid #FEDC00", borderBottom:"3px solid #FEDC00"}}>영화</h2>
                    <TicketingMovie />
                </div>
                <div className="col-sm-4">
                    <h2>극장</h2>
                    <TicketingTheater />
                </div>
                <div className="col-sm-4">
                    <h2>시간표</h2>
                    <TicketingTimeTable />
                </div>
            </div>

        </div>
    )
}

export default TicketingPage