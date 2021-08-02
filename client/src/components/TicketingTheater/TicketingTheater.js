import styles from "./ticketingTheater.module.scss"
const TicketingTheater = ({ticketInfo, cinemaInfo, setTicketInfo}) => {

    function handleClick(event) {
        // event.preventDefault()
        console.log(event.target.name)
        setTicketInfo({ ...ticketInfo, cinema: event.target.name })
    }

    return (
        <div >
            <div className="d-grid gap-2">
                <button name={cinemaInfo.cinemaName} className={`${ticketInfo.cinema === cinemaInfo.cinemaName ? styles.on : styles.btn}`} onClick={handleClick}>{cinemaInfo.cinemaName}</button>
            </div>
        </div>
    )
}

export default TicketingTheater