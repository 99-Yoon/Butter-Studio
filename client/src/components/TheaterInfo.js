import { useState, useEffect } from 'react'
import axios from "axios"
import catchErrors from "../utils/catchErrors"
// import InfoModal from "./InfoModal"
// const { kakao } = window;

const TheaterInfo = () => {
    // if (kakao) {
    //     console.log("kakao")
    //     const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    //         mapOption = {
    //             center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    //             level: 3 // 지도의 확대 레벨
    //         };
    //     // 지도를 생성합니다    
    //     const map = new kakao.maps.Map(mapContainer, mapOption);
    //     // 주소-좌표 변환 객체를 생성합니다
    //     const geocoder = new kakao.maps.services.Geocoder();
    //     // 주소로 좌표를 검색합니다
    //     geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {
    //         // 정상적으로 검색이 완료됐으면 
    //         if (status === kakao.maps.services.Status.OK) {
    //             const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //             // 결과값으로 받은 위치를 마커로 표시합니다
    //             const marker = new kakao.maps.Marker({
    //                 map: map,
    //                 position: coords
    //             });
    //             // 인포윈도우로 장소에 대한 설명을 표시합니다
    //             const infowindow = new kakao.maps.InfoWindow({
    //                 content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
    //             });
    //             infowindow.open(map, marker);
    //             // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //             map.setCenter(coords);
    //         }
    //     });
    // }
    const [theaterInfo, setTheaterInfo] = useState()
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
        if (currentInfo.title === "parking") {
            setTabContent(<div>{currentInfo.information}</div>)
        } else if (currentInfo.title === "address") {
            setTabContent(<div id="map">{currentInfo.information}</div>)
        } else {
            setTabContent(<div>{currentInfo.information}</div>)
        }
    }, [currentInfo])

    async function getTheaterInfo() {
        try {
            const response = await axios.get('/api/info/cinema')
            const response2 = await axios.get('/api/theater')
            setTheaterInfo({...response.data, theaterNum:response2.data.length})
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
            {theaterInfo ?
                <div>
                    {/* {console.log(currentInfo)} */}
                    {/* {console.log(theaterInfo)} */}
                    <h2 className="m-5">{theaterInfo.cinemaName}</h2>
                    <div className="my-3 text-center">
                        <img src="/images/movieTheater.jpg" style={{ width: "80%" }} />
                    </div>
                    <div className="m-3">총 상영관 수: {theaterInfo.theaterNum}개</div>
                    <div className="m-3">{theaterInfo.address}</div>
                    <div className="row justify-content-sm-center py-5">
                        <div className="col-sm-4 text-end">
                            <div className="m-2">
                                <img src="/images/icon-bus.png" style={{ width: "35px" }} />
                                <button className="px-3" name="대중교통 안내" id="transportation" value={theaterInfo.transportation} type="button" onClick={handleClick} style={{ background: "black", borderLeftColor: "black", borderTopColor: "black", borderBottomColor: "black", color: "white", borderRightColor: currentInfo.title === "transportation" ? "white" : "black" }}>대중교통 안내
                                </button>
                            </div>
                            <div className="m-2">
                                <img src="/images/icon-car.png" style={{ width: "35px" }} />
                                <button className="px-3" name="자가용/주차 안내" id="parking" value={theaterInfo.parking} type="button" onClick={handleClick} style={{ background: "black", borderLeftColor: "black", borderTopColor: "black", borderBottomColor: "black", color: "white", borderRightColor: currentInfo.title === "parking" ? "white" : "black" }}>자가용/주차 안내
                                </button>
                            </div>
                            <div className="m-2">
                                <img src="/images/icon-map.png" style={{ width: "35px" }} />
                                <button className="px-3" name="지도보기" id="address" value={theaterInfo.address} type="button" onClick={handleClick} style={{ background: "black", borderLeftColor: "black", borderTopColor: "black", borderBottomColor: "black", color: "white", borderRightColor: currentInfo.title === "address" ? "white" : "black" }}>지도보기
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="m-2">
                                {tabContent}
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