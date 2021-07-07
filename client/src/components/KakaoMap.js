import { useEffect, useRef } from "react";

const { kakao } = window;

const KakaoMap = ({ adress }) => {
    const kakaoMapDiv = useRef(null)

    useEffect(() => {
        const container = kakaoMapDiv.current
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(`${adress}`, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                map.setCenter(coords);
            } else if (adress != '') {
                alert("찾을 수 없는 주소입니다. 다시 입력해주세요.")
            }
        });
    }, [adress])

    return (
        <div ref={kakaoMapDiv} style={{ width: "500px", height: "400px" }}></div>
    )
}

export default KakaoMap