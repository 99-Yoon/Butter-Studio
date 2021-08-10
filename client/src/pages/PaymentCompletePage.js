import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { useAuth } from '../context/auth_context'
import catchErrors from '../utils/catchErrors'
import reservationApi from '../apis/reservation.api'
import kakaopayApi from '../apis/kakaopay.api';

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
            setError("")
            const response = await axios.get(`/api/auth/guestinfo/${user.id}`);
            const response2 = await reservationApi.findOneReservation()
            const response3 = await reservationApi.saveTid({ tid: localStorage.getItem('tid')})
            if (response.data || response2) {
                const responseEmail = await axios.post('/api/email/send', {
                    reservationData: response2.map(el => { return { "row": el.row, "col": el.col } }),
                    userData: { ...response.data },
                    cinema: "Butter Studio 조치원",
                    title: response2[0].title,
                    theater: response2[0].theater.theaterName,
                    time: response2[0].timetable.date.split('T')[0] + ' ' + moment(response2[0].timetable.start_time).format('HH:mm')
                })
                localStorage.removeItem('tid')
            }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function saveUserReservation() {
        try {
            setError("")
            const response = await axios.post(`/api/auth/getuserinfo`, {
                id: user.id
            })
            const response2 = await reservationApi.findOneReservation()
            const response3 = await reservationApi.saveTid({ tid: localStorage.getItem('tid')})
            if (response.data || response2) {
                const responseEmail = await axios.post('/api/email/send', {
                    reservationData: response2.map(el => { return { "row": el.row, "col": el.col } }),
                    userData: { ...response.data },
                    cinema: "Butter Studio 조치원",
                    title: response2[0].title,
                    theater: response2[0].theater.theaterName,
                    time: response2[0].timetable.date.split('T')[0] + ' ' + moment(response2[0].timetable.start_time).format('HH:mm')
                })
                localStorage.removeItem('tid')
            }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function approveKakaopay(tid) {
        try {
            setError("")
            const urlParams = new URLSearchParams(window.location.search);
            const pg_token = urlParams.get('pg_token');
            const response = await kakaopayApi.approveSuccess({
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
        <div className="container text-center py-5">
            <h3 className="my-3 text-white">예매가 정상적으로 완료되었습니다.</h3>
            {user.role === "member"
                ?
                <a href="/mypage">
                    <button className="btn btn-warning mx-1">마이페이지</button>
                </a>
                :
                <a href="/">
                    <button className="btn btn-warning mx-1">홈으로</button>
                </a>
            }
        </div>
    )
}

export default PaymentCompletePage