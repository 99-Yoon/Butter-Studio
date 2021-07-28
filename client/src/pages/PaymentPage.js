import axios from 'axios'
import { useState } from 'react'
import Kakaopay from '../components/Kakaopay'

const Payment = ({ location }) => {
    const [ticketInfo, setTicketInfo] = useState({ ...location.state })

    async function SendMail(e) {
        try {
            const response = await axios.post('/api/email/send',{
                email:e.target.name
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container" style={{ color: "white" }}>
            {console.log(ticketInfo)}
            <div className="row justify-content-center my-5">
                <div className="col-sm-4 mb-3 ">
                    <h3 className="py-2 text-white text-center" style={{ border: "3px solid #000000", borderBottom: "3px solid #FEDC00" }}>결제하기</h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-8 text-center">
                    <h5 className="mb-3">결제방법</h5>
                    <img src="/images/naverpay_button.png"  />
                    <Kakaopay ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
                </div>
                <div className="col-sm-4 p-3 text-center rounded-3" style={{ backgroundColor: "#252525" }}>
                    <img style={{ maxHeight: "10rem" }} src={`https://image.tmdb.org/t/p/original${ticketInfo.poster_path}`} alt="영화포스터" />
                    <h5 className="my-3">{ticketInfo.title}</h5>
                    <div>{ticketInfo.theater}</div>
                    <div>{ticketInfo.time}</div>
                    <div className="mb-3">{ticketInfo.selectedCinemaNum}관 {ticketInfo.selectedSeats}</div>
                    <div className="rounded-3 p-3" style={{backgroundColor:'#404040'}}>
                        <div>청소년: {ticketInfo.teenager}명</div>
                        <div>성인: {ticketInfo.adult}명</div>
                        <div>경로우대: {ticketInfo.elderly}명</div>
                        <div>총 결제금액: {ticketInfo.teenager*7000 +ticketInfo.adult*8000+ticketInfo.elderly*6000}</div>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" name="jiwon5393@naver.com" onClick={SendMail}>메일발송</button>
            </div>
        </div>
    )
}

export default Payment