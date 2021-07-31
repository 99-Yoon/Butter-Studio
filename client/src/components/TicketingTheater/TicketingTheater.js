import styles from "./ticketingTheater.module.scss"
const TicketingTheater = (props) => {

    function handleClick(event) {
        // event.preventDefault()
        console.log(event.target.name)
        props.setTicketInfo({ ...props.ticketInfo, cinema: event.target.name })
    }

    return (
        <div >
            <div className="d-grid gap-2">
                <button name={props.cinemaInfo.cinemaName} className={`${props.ticketInfo.cinema === props.cinemaInfo.cinemaName ? styles.on : styles.btn}`} onClick={handleClick}>{props.cinemaInfo.cinemaName}</button>
            </div>
        </div>
    )
}

export default TicketingTheater