import axios from 'axios'
import { useAuth } from '../context/auth_context'
import { useEffect, useState } from 'react'

import catchErrors from '../utils/catchErrors'
import reservationApi from '../apis/reservation.api'


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

    async function getGuestInfo() {
        try {
            if (user.id > 0) {
                const response = await axios.get(`/api/auth/guestinfo/${user.id}`);
                const guest = {
                    userType: "guest",
                    user: user.id
                };
                const response2 = await reservationApi.findOneReservation(guest);
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
                        time:"2021/07/21 10:00"
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
            const member = {
                userType: "member",
                user: user.id
            }
            const response2 = await reservationApi.findOneReservation(member);
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