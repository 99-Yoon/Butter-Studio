import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { useAuth } from '../context/auth_context'
import catchErrors from '../utils/catchErrors'
import reservationApi from '../apis/reservation.api'

const PaymentCompletePage = () => {
    const { user } = useAuth()
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [paymentData, setPaymentData] = useState()

    useEffect(() => {
        if (user.id > 0) {
            const tid = localStorage.getItem('tid')
            approveKakaopay(tid)
            if (user.role === "member") {
                saveUserReservation()
            } else {
                saveGuestReservation()
            }
        }
    }, [user])

    async function saveGuestReservation() {
        try {
            const response = await axios.get(`/api/auth/guestinfo/${user.id}`);
            const response2 = await reservationApi.findOneReservation()
            console.log("예매내역=====", response2)
            if (response.data || response2) {
                const responseEmail = await axios.post('/api/email/send', {
                    reservationData: response2.map(el => { return { "row": el.row, "col": el.col } }),
                    userData: { ...response.data },
                    cinema: "Butter Studio 조치원",
                    title: response2[0].title,
                    theater: response2[0].theater.theaterName,
                    time: response2[0].timetable.date.split('T')[0] + ' ' + moment(response2[0].timetable.start_time).format('HH:mm')
                })
                console.log(responseEmail.data)
            }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function saveUserReservation() {
        try {
            const response = await axios.post(`/api/auth/getuserinfo`, {
                id: user.id
            })

            // if (response.data) {
            //     const responseEmail = await axios.post('/api/email/send', {
            //         ...response2.data,
            //         ...response.data,

            //     })
            //     console.log(responseEmail.data)
            // }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function approveKakaopay(tid) {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const pg_token = urlParams.get('pg_token');
            const response = await axios.post(`/api/kakaopay/success`, {
                'tid': tid,
                cid: 'TC0ONETIME',
                partner_order_id: 'butter_studio',
                partner_user_id: '000000' + user.id,
                pg_token: pg_token
            })
            setPaymentData(response.data)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="text-center">
            <h3>예매가 정상적으로 완료되었습니다.</h3>
            <button>홈으로</button>
            {user.role === "member" ? <button>마이페이지</button> : <></>}
        </div>
    )
}

export default PaymentCompletePage