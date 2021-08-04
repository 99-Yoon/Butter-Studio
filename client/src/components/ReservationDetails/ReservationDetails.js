import styles from "./reservation-details.module.scss";

const ReservationDetails = () => {
    return (
        <div className={`d-flex flex-column align-items-center ${styles.width}`}>
            <div className={`${styles.header}`}>나의 예매 내역</div>
            <div className={`${styles.body}`}>
                <div className={`d-flex justify-content-around align-items-center py-3`}>
                    <div className={`${styles.span} d-flex justify-content-center`}>
                        <span>영화 포스터</span>
                    </div>
                    <div className={`${styles.span} d-flex flex-column`}>
                        <span>영화제목</span>
                        <span>예매확인번호</span>
                        <span>예매날짜</span>
                        <span>상영관</span>
                        <span>좌석정보</span>
                        <span>결제금액</span>
                        <span>결제수단</span>
                    </div>
                </div>
            </div>
            <div className={`${styles.header}`}>나의 리뷰</div>
        </div>
    )
}

export default ReservationDetails