import { useEffect, useState } from 'react'
import { useAuth } from '../context/auth_context'
import catchErrors from '../utils/catchErrors'
import reservationApi from '../apis/reservation.api'

const PaymentCompletePage = () => {
    const [error, setError] = useState()

    useEffect(() => {
        deleteReservation()
    }, [])


    async function deleteReservation() {
        try {
            const response = await reservationApi.deleteReservation()
            localStorage.removeItem('tid')
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="container text-center py-5">
            <h3 className="my-3 text-white">결제에 실패하셨습니다.</h3>
            <a href="/ticket">
                <button className="btn btn-warning mx-1">다시 예매하기</button>
            </a>
            <a href="/">
                <button className="btn btn-warning mx-1">홈으로</button>
            </a>

        </div>
    )
}

export default PaymentCompletePage