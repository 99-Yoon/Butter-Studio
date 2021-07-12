import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MoviePage = ({ location }) => {
    const [movieInfo, setMovieInfo] = useState({
        ...location.state,
        stillCuts: ["/images/movie_image_black_stillcut1.jpg", "/images/movie_image_black_stillcut2.jpg", "/images/movie_image_black_stillcut3.jpg"],
        production: "케이트 쇼트랜드",
        casts: ["Scarlett Johansson", "Florence Pugh", "David Harbour", "Rachel Weisz"],
        genres: ["액션", "모험", "스릴러"],
        attendance: 585954
    })
    const [state, setState] = useState(0)

    return (
        <div className="container" style={{ backgroundColor: "black" }}>
            {console.log(movieInfo)}
            <div id="carouselExampleInterval" className="carousel slide py-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {movieInfo.stillCuts.length > 0
                        ? movieInfo.stillCuts.map((image, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval="1000">
                                <img src={image} className="d-block w-100" alt="스틸컷" />
                            </div>
                        ))
                        : <div className="carousel-item">
                            <img src="..." className="d-block w-100" alt="등록된 스틸컷이 없습니다." />
                        </div>}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="row justify-content-center py-5">
                <div className="col-sm-3">
                    <img className="img-thumbnail" src={movieInfo.poster} alt="영화포스터" />
                </div>
                <div className="col-sm-6 p-4" style={{ color: "white" }}>
                    <h1 className="py-3">{movieInfo.title}</h1>
                    <p>예매율: {movieInfo.popularity}% 누적관객수: {movieInfo.attendance}명</p>
                    <p>감독: {movieInfo.production}</p>
                    <p>출연: {movieInfo.casts.map(e => e)}</p>
                    <p>장르: {movieInfo.genres.map(e => e)}</p>
                    <p>개봉일:{movieInfo.release_date}</p>
                    <Link to={{
                            pathname: `/ticket`,
                            state: {
                                id: movieInfo.id,
                                poster: movieInfo.poster,
                                title: movieInfo.title,
                            }
                        }}>
                        <button className="btn btn-warning">예매하기</button>
                    </Link>
                </div>
            </div>
            <div className="">
                <ul className="nav nav-tabs justify-content-center my-4 border-0" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 0 ? "3px solid" : "none", borderBottomColor: state === 0 ? "#FEDC00" : "black" }} id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true" onClick={() => setState(0)}>상세정보</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 1 ? "3px solid" : "none", borderBottomColor: state === 1 ? "#FEDC00" : "black" }} id="stillcut-tab" data-bs-toggle="tab" data-bs-target="#stillcut" type="button" role="tab" aria-controls="stillcut" aria-selected="false" onClick={() => setState(1)}>예고편/스틸컷</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 2 ? "3px solid" : "none", borderBottomColor: state === 2 ? "#FEDC00" : "black" }} id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="false" onClick={() => setState(2)}>관람평</button>
                    </li>
                </ul>
            </div>
            <div className="tab-content text-center" id="myTabContent" style={{ color: "white" }}>
                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                    <div>{movieInfo.overview}</div>
                </div>
                <div className="tab-pane fade" id="stillcut" role="tabpanel" aria-labelledby="stillcut-tab">
                    <div>예고편/스틸컷</div>
                </div>
                <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                    <div>관람평</div>
                </div>
            </div>
        </div>

    )
}

export default MoviePage