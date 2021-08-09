import MyInfo from "../components/MyInfo/MyInfo"
import ReservationDetails from "../components/ReservationDetails/index.js";

const MyPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center py-4">
            <MyInfo/>
            <ReservationDetails/>
        </div>
    )
}

export default MyPage