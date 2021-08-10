import TimeTable from "../Admin/TimeTable";

const TicketingTimeTable = ({ ticketInfo, setTicketInfo }) => {

    return (
        <div style={{ color: "white" }}>
            {ticketInfo.movieId && ticketInfo.cinema
                ? <TimeTable ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
                : <div className="text-center">영화와 극장을 모두 선택해주세요.</div>}
        </div>
    )
}

export default TicketingTimeTable