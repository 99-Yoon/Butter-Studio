// import { useState } from 'react'
import styles from './seatTable.module.scss'

const SeatTable = ({ theaterInfo, count, setSelectedSeats, selectedSeats, reservedSeats }) => {
    const table = []
    if (theaterInfo) {
        for (let rowIndex = 0; rowIndex < theaterInfo.rows; rowIndex++) {
            table.push(<span className="me-3" style={{ color: "gray" }}>{String.fromCharCode(rowIndex + 65)}</span>)
            for (let colIndex = 0; colIndex < theaterInfo.columns; colIndex++) {
                table.push(
                    <span>
                        {reservedSeats.find(el => el === String(rowIndex + 1) + '-' + String(colIndex + 1))
                            ?
                            <button className={styles.btnBlock} name={rowIndex + 1} id={colIndex + 1} type="button" disabled>{colIndex + 1}</button>
                            :
                            <button className={selectedSeats.find(el => el === String(rowIndex + 1) + '-' + String(colIndex + 1)) ? styles.on : styles.btn} name={rowIndex + 1} id={colIndex + 1} type="button" onClick={handleClick}> {colIndex + 1} </button>
                        }
                    </span>
                )
            }
            table.push(<br />)
        }
    }


    function handleClick(event) {
        const num = Object.values(count).reduce((a, b) => (a + b))
        if (selectedSeats.find(el => el === event.target.name + '-' + event.target.id)) {
            //제거
            const deleted = selectedSeats.filter((element) => element !== event.target.name + '-' + event.target.id);
            setSelectedSeats(deleted)
        } else {
            if (selectedSeats.length > num - 1) {
                alert("선택한 좌석이 예매인원보다 많습니다.")
            } else {
                //추가
                setSelectedSeats([...selectedSeats, event.target.name + '-' + event.target.id])
            }
        }

    }
    return (
        <div className="text-center">
            <div className="mb-2" style={{ backgroundColor: "gray" }}>Screen</div>
            {table}
        </div>
    )
}

export default SeatTable