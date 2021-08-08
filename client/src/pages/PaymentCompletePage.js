import axios from 'axios'
import { useAuth } from '../context/auth_context'
import { useEffect, useState } from 'react'

import catchErrors from '../utils/catchErrors'


const PaymentCompletePage = () => {
    const { user } = useAuth()
    const [error, setError] = useState()

    useEffect(() => {
        if (user.role === "member") {
            getUserInfo()
        } else {
            getGuestInfo()
        }
    }, [user])

    useEffect(() => {
        const tid = localStorage.getItem('tid')
        approveKakaopay(tid)
    }, [])

    async function getGuestInfo() {
        try {
            if (user.id > 0) {
                const response = await axios.get(`/api/auth/guestinfo/${user.id}`)
                const response2 = await axios.post(`/api/reservation/findonereservation`, {
                    userType: "guest",
                    user: user.id
                })
                console.log({
                    reservationData: [...response2.data],
                    userData: { ...response.data },
                })
                if (response.data || response2.data) {
                    const responseEmail = await axios.post('/api/email/send', {
                        reservationData: [...response2.data],
                        userData: { ...response.data },
                        cinema: "Butter Studio 조치원",
                        title: "더 수어사이드 스쿼드",
                        theater: "1",
                        time: "2021/07/21 10:00"
                    })
                    console.log(responseEmail.data)
                }

                console.log(response.data)
            }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function getUserInfo() {
        try {
            const response = await axios.post(`/api/auth/getuserinfo`, {
                id: user.id
            })
            const response2 = await axios.post(`/api/reservation/findonereservation`, {
                userType: "member",
                user: user.id
            })
            console.log(response2.data)
            if (response.data || response2.data) {
                const responseEmail = await axios.post('/api/email/send', {
                    ...response2.data,
                    ...response.data,

                })
                console.log(responseEmail.data)
            }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    async function approveKakaopay(tid) {
        const urlParams = new URLSearchParams(window.location.search);
        const pg_token = urlParams.get('pg_token');
        try {
            if (user) {
                console.log(user.id)
                const response = await axios.post(`/api/kakaopay/success`, {
                    'tid': tid,
                    cid: 'TC0ONETIME',
                    partner_order_id: 'butter_studio',
                    partner_user_id: '000000' + '6',
                    pg_token: pg_token
                })
                console.log(response.data)
            }
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="text-center">
            <h3>예매가 정상적으로 완료되었습니다.</h3>
            <button>홈으로</button>
            {
                user.role === "member" ? <button>마이페이지</button> : <></>
            }
        </div>
    )
}

export default PaymentCompletePage