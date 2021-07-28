import axios from 'axios'

const Kakaopay = (props) => {
    async function handleClick() {
        try {
            const response = await axios.post('/api/kakaopay/test/single', {
                cid: 'TC0ONETIME',
                partner_order_id: 'orderNum',
                partner_user_id: 'userName',
                item_name: props.ticketInfo.title,
                quantity: props.ticketInfo.teenager+props.ticketInfo.adult+props.ticketInfo.elderly,
                total_amount: props.ticketInfo.teenager * 7000 + props.ticketInfo.adult * 8000 + props.ticketInfo.elderly * 6000,
                vat_amount: 0,
                tax_free_amount: 0,
                approval_url: 'http://localhost:3000/',
                fail_url: 'http://localhost:3000/',
                cancel_url: 'http://localhost:3000/',
            })
            console.log(response.data)
            if (response.data) {
                window.location.href = response.data.redirect_url
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={handleClick} style={{ backgroundColor: "black", border: '0' }}>
                <img src="/images/payment_icon_yellow_medium.png" />
            </button>
        </>
    )
}

export default Kakaopay