import styles from "./ticketingTheater.module.scss"
const TicketingTheater = (props) => {

    function handleClick(event) {
        // event.preventDefault()
        console.log(event.target.name)
        props.setTicketInfo({ ...props.ticketInfo, theater:event.target.name})
    }

    return (
        <div >
            <div className="d-grid gap-2">
                {props.theaterInfo.theater.length > 0
                    ? props.theaterInfo.theater.map(name => (
                        <button name={name} className={`${props.ticketInfo.theater === name ? styles.on : styles.btn}`} onClick={handleClick}>{name}</button>
                    ))
                    : <div>영화관 정보가 존재하지 않습니다.</div>}
            </div>
        </div>
    )
}

export default TicketingTheater