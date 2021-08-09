import { useRef, useState, useEffect } from 'react'
import axios from "axios"
import catchErrors from "../utils/catchErrors"
// import InfoModal from "./InfoModal"
const { kakao } = window;
const options = {
    center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
    level: 3
};
const TheaterInfo = () => {
    const container = useRef(null)
    const [cinemaInfo, setCinemaInfo] = useState()
    const [currentInfo, setCurrentInfo] = useState({
        name: "init",
        title: "init",
        information: "init"
    })
    const [error, setError] = useState()
    const [tabContent, setTabContent] = useState([])
    useEffect(() => {
        getTheaterInfo()
    }, [])

    useEffect(() => {
        if (currentInfo.title === "address") {
            // 지도를 담을 영역의 DOM 레퍼런스
            const container = document.getElementById("map");
            // center옵션은 지도를 생성하는데 반드시 필요하며 파라미터는 위경도좌표이다. (위도,경도 순서)
            // level옵션은 지도의 확대, 축소 정도이다.
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            // 지도 생성 및 객체 리턴
            const map = new kakao.maps.Map(container, options);
            const geocoder = new kakao.maps.services.Geocoder();
            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(`${cinemaInfo.address}`, function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    const infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="color:black; width:150px;text-align:center;padding:6px 0;">Butter Studio</div>'
                    });
                    infowindow.open(map, marker);
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        }
    }, [currentInfo]);

    async function getTheaterInfo() {
        try {
            const response = await axios.get('/api/info/cinema')
            const response2 = await axios.get('/api/theater')
            setCinemaInfo({ ...response.data, theaterNum: response2.data.length })
            setCurrentInfo({
                name: "대중교통 안내",
                title: "transportation",
                information: response.data.transportation
            })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function handleClick(e) {
        setCurrentInfo({
            name: e.target.name,
            title: e.target.id,
            information: e.target.value
        })
    }


    return (
        <>
            {cinemaInfo ?
                <div>
                    {/* {console.log(currentInfo)} */}
                    {console.log(cinemaInfo)}
                    <h2 className="m-5">{cinemaInfo.cinemaName}</h2>
                    <div className="my-3 text-center">
                        <img src="/images/movieTheater.jpg" style={{ width: "80%" }} />
                    </div>
                    <div className="m-3">총 상영관 수: {cinemaInfo.theaterNum}개</div>
                    <div className="m-3">{cinemaInfo.address}</div>
                    <div className="row justify-content-sm-center py-5">
                        <div className="col-sm-4 text-end">
                            <div className="m-2">
                                <img src="/images/icon-bus.png" style={{ width: "35px" }} />
                                <button className="px-3" name="대중교통 안내" id="transportation" value={cinemaInfo.transportation} type="button" onClick={handleClick} style={{ background: "black", borderLeftColor: "black", borderTopColor: "black", borderBottomColor: "black", color: "white", borderRightColor: currentInfo.title === "transportation" ? "white" : "black" }}>대중교통 안내
                                </button>
                            </div>
                            <div className="m-2">
                                <img src="/images/icon-car.png" style={{ width: "35px" }} />
                                <button className="px-3" name="자가용/주차 안내" id="parking" value={cinemaInfo.parking} type="button" onClick={handleClick} style={{ background: "black", borderLeftColor: "black", borderTopColor: "black", borderBottomColor: "black", color: "white", borderRightColor: currentInfo.title === "parking" ? "white" : "black" }}>자가용/주차 안내
                                </button>
                            </div>
                            <div className="m-2">
                                <img src="/images/icon-map.png" style={{ width: "35px" }} />
                                <button className="px-3" name="지도보기" id="address" value={cinemaInfo.address} type="button" onClick={handleClick} style={{ background: "black", borderLeftColor: "black", borderTopColor: "black", borderBottomColor: "black", color: "white", borderRightColor: currentInfo.title === "address" ? "white" : "black" }}>지도보기
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="m-2">
                                <div id="parking" style={{ display: currentInfo.title === "parking" ? 'block' : 'none' }}>{currentInfo.information}</div>
                                <div id="map" ref={container} style={{ width: "400px", height: "300px", display: currentInfo.title === "address" ? 'block' : 'none' }}></div>
                                <div id="transportaion" style={{ display: currentInfo.title === "transportation" ? 'block' : 'none' }} >{currentInfo.information}</div>
                            </div>
                        </div>
                    </div>
                    <div id="map"></div>
                </div>
                :
                <div>
                    극장정보를 불러올 수 없습니다.
                </div>}
        </>
    )
}

export default TheaterInfo