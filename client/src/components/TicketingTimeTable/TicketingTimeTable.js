const TicketingTimeTable = ({ ticketInfo }) => {

    return (
        <div className="text-center" style={{ color: "white" }}>
            {ticketInfo.movieId && ticketInfo.cinema
                ? <div>{ticketInfo.movieId} {ticketInfo.cinema}</div>
                : <div>영화와 극장을 모두 선택해주세요.</div>}
        </div>
    )
}

export default TicketingTimeTable