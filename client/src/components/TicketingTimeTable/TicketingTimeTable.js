const TicketingTimeTable = (props) => {
    return (
        <div>
            <div className="text-center" style={{color:"white"}}>
                {console.log(props.ticketInfo.movieId, props.ticketInfo.theater)}
                {props.ticketInfo.movieId && props.ticketInfo.theater
                    ? <div>{props.ticketInfo.movieId} {props.ticketInfo.theater}</div>
                    : <div>영화와 극장을 모두 선택해주세요.</div>}
            </div>
        </div>
    )
}

export default TicketingTimeTable