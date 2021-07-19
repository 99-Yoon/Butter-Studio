import styles from "./ticketingTheater.module.scss"
const TicketingTheater = (props) => {

    return (
        <div className={``} >
            <div className="d-grid gap-2">
                {props.theaterInfo.cinemaNum.length > 0
                    ? props.theaterInfo.cinemaNum.map(num => (
                        <button className={`${styles.btn}`} onClick={()=>props.setTheaterInfo({...props.theaterInfo,selectedCinemaNum:num})}>{num}</button>
                    ))
                    : <div>영화정보를 불러올 수 없습니다.</div>}
            </div>
        </div>
    )
}

export default TicketingTheater