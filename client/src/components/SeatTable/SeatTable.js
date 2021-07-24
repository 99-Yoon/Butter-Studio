import { useState } from 'react'
import styles from './seatTable.module.scss'

const SeatTable = (props) => {
    const table = []
    for (let rowIndex = 0; rowIndex < props.allSeat.row; rowIndex++) {
        table.push(<span className="me-3" style={{color:"gray"}}>{String.fromCharCode(rowIndex + 65)}</span>)
        // console.log(String.fromCharCode(rowIndex+65))
        for (let colIndex = 0; colIndex < props.allSeat.col; colIndex++) {
            table.push(
                <span>
                    <button className={props.selectedSeats.find(el => el === String.fromCharCode(rowIndex + 65) + String(colIndex + 1)) ? styles.on : styles.btn} name={`${String.fromCharCode(rowIndex + 65)}${colIndex + 1}`} type="button" onClick={handleClick}> {colIndex + 1} </button>
                </span>
            )
        }
        table.push(<br />)
    }

    function handleClick(event) {
        const num = Object.values(props.count).reduce((a, b) => (a + b))
        if (props.selectedSeats.find(el => el === event.target.name)) {
            //제거
            const deleted = props.selectedSeats.filter((element) => element !== event.target.name);
            props.setSelectedSeats(deleted)
        } else {
            if (props.selectedSeats.length > num - 1) {
                alert("선택한 좌석이 예매인원보다 많습니다.")
            } else {
                //추가
                props.setSelectedSeats([...props.selectedSeats, event.target.name])
            }
        }

    }
    return (
        <div className="text-center">
            {console.log(props.selectedSeats)}
            <div className="mb-2" style={{ backgroundColor: "gray" }}>Screen</div>
            {table}
        </div>
    )
}

export default SeatTable