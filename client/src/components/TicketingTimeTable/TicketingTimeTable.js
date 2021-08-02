const TicketingTimeTable = ({ticketInfo}) => {
    return (
        <div>
            <div className="text-center" style={{color:"white"}}>
                {console.log(ticketInfo.movieId, ticketInfo.cinema)}
                {ticketInfo.movieId && ticketInfo.cinema
                    ? <div>{ticketInfo.movieId} {ticketInfo.cinema}</div>
                    : <div>영화와 극장을 모두 선택해주세요.</div>}
            </div>
        </div>
    )
}

export default TicketingTimeTable