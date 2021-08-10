import kakaopayApi from "../apis/kakaopay.api"
import catchErrors from "../utils/catchErrors"

const KakaopaymentCancelBtn = () => {

    const [error, setError] = useState()

    async function paymentCancel() {
        try {
            setError("")
            //실행하기 전에 먼저 reservation에서 해당하는 예매건에 대한 tid가져오기
            const response = await kakaopayApi.paymentCancel({
                cid: 'TC0ONETIME',
                tid: '',
                cancel_amount: '',
                cancel_tax_free_amount:0,
            })
        } catch (error) {
            catchErrors(error,setError)
        }
    }

    return (
        <button className="btn btn-warning" onClick={paymentCancel }>결제취소</button>
    )
}