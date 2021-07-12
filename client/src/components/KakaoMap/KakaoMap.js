import { useState, useEffect, useRef } from "react";
import styles from "./kakao-map.module.scss";

const { kakao } = window;

const KakaoMap = ({ keyword }) => {
    const kakaoMapDiv = useRef(null)
    const menu = useRef(null)
    const searchList = useRef(null)
    const page = useRef(null)
    const [places, setPlaces] = useState([])
    let markers = []

    useEffect(() => {
        const container = kakaoMapDiv.current
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places();
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        searchPlaces(keyword)

        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces(keyword) {
            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요.');
                return false
            }
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword, placesSearchCB);
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                displayPlaces(data);

                // 페이지 번호를 표출합니다
                displayPagination(pagination);
                // let bounds = new kakao.maps.LatLngBounds()
                // for (let i = 0; i < data.length; i++) {
                //     displayMarker(data[i])
                //     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                // }
                // map.setBounds(bounds)
                // // 페이지 목록 보여주는 displayPagination() 추가
                // displayPagination(pagination)
                // setPlaces(data)
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
                return
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
                return
            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {
            let listEl = searchList.current,
                menuEl = menu.current,
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = '';

            for (let i = 0; i < places.length; i++) {
                // 마커를 생성하고 지도에 표시합니다
                let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                displayMarker(places[i], itemEl)
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);
                fragment.appendChild(itemEl);
            }
            // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }

        function displayMarker(place, itemEl) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            })
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(map, marker)
            })
            kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
            })
            itemEl.onmouseover = function () {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(map, marker)
            };
            itemEl.onmouseout = function () {
                infowindow.close();
            };
        }

    }, [keyword])

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
        let paginationEl = page.current,
            fragment = document.createDocumentFragment(),
            i;

        for (i = 1; i <= pagination.last; i++) {
            let el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;
            if (i === pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function (i) {
                    return function () {
                        pagination.gotoPage(i);
                    }
                })(i);
            }
            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
        let el = document.createElement('li'),
            itemStr = '<span className="markerbg marker_' + (index + 1) + '"></span>' +
                '<div className="info">' +
                '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                '   <span className="jibun gray">' + places.address_name + '</span>';
        } else {
            itemStr += '    <span>' + places.address_name + '</span>';
        }

        itemStr += '  <span className="tel">' + places.phone + '</span>' +
            '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';
        return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    // function addMarker(position, idx, title) {
    //     const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
    //         imgOptions = {
    //             spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    //             spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    //             offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    //         },
    //         markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    //         marker = new kakao.maps.Marker({
    //             position: position, // 마커의 위치
    //             image: markerImage
    //         });

    //     marker.setMap(map); // 지도 위에 마커를 표출합니다
    //     markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    //     return marker;
    // }
    return (
        <>
            <div ref={kakaoMapDiv} style={{ width: "500px", height: "400px" }}></div>
            <div ref={menu} className="bg-white">
                <div ref={searchList}></div>
                {/* {places.map((item, i) => (
                    <div key={i} style={{ marginTop: '20px' }}>
                        <h5>{i + 1}. {item.place_name}</h5>
                        <div>
                            {item.road_address_name ? (
                                <div>
                                    <span>{item.road_address_name}</span>
                                    <span>{item.address_name}</span>
                                </div>
                            ) : (
                                <span>{item.address_name}</span>
                            )}
                            <span>{item.phone}</span>
                        </div>
                    </div>
                ))} */}
                <div ref={page}></div>
            </div>
        </>
    )
}

export default KakaoMap