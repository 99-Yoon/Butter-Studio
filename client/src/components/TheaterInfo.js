import { useRef, useState, useEffect } from 'react'
import cinemaApi from "../apis/cinema.api.js"
import theaterApi from "../apis/theater.api.js"
import catchErrors from "../utils/catchErrors"

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
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(`${cinemaInfo.address}`, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
                    const infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="color:black; width:150px;text-align:center;padding:6px 0;">Butter Studio</div>'
                    });
                    infowindow.open(map, marker);
                    map.setCenter(coords);
                }
            });
        }
    }, [currentInfo]);

    async function getTheaterInfo() {
        try {
            const response = await cinemaApi.getCinemaInfo()
            const response2 = await theaterApi.getAll()
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