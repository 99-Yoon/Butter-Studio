import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Video from '../components/Video.js';
import movieApi from '../apis/movie.api.js';
import catchErrors from "../utils/catchErrors.js";

const MoviePage = ({ location }) => {
    const [movieInfo, setMovieInfo] = useState({
        ...location.state,
        stillCuts: [],
        cast: [],
        director: []
    })
    const [state, setState] = useState(0)
    const [error, setError] = useState("")

    useEffect(() => {
        getImagesAndCredits()
    }, [])

    async function getImagesAndCredits() {
        try {
            const images = await movieApi.getImagesfromTM(movieInfo.id)
            const still = images.backdrops.map(el => el.file_path)
            const credits = await movieApi.getCreditsfromTM(movieInfo.id)
            const castsInfo = credits.cast.map(el => el.name)
            const directorsInfo = await credits.crew.filter(element => element.job === "Director").map(el => el.name)
            setMovieInfo({
                ...movieInfo,
                stillCuts: still,
                cast: castsInfo,
                director: directorsInfo
            })
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div className="container" style={{ backgroundColor: "black" }}>
            <div id="carouselExampleInterval" className="carousel slide py-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {movieInfo.stillCuts.length > 0
                        ? movieInfo.stillCuts.map((imageUrl, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} >
                                <img src={`https://image.tmdb.org/t/p/original${imageUrl}`} className="d-block w-100" alt="스틸컷" />
                            </div>
                        ))
                        : <div className="carousel-item">
                            {console.log("스틸컷 불러오기 오류")}
                            <img src="/images/none.jpg" className="d-block w-100" alt="등록된 스틸컷이 없습니다." />
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
                <div className="col-sm-3 mb-5">
                    <img className="img-thumbnail" src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`} alt="영화포스터" />
                </div>
                <div className="col-sm-6" style={{ color: "white" }}>
                    <h1 className="pb-3">{movieInfo.title}</h1>
                    <p>예매율: {Math.round((movieInfo.ticket_sales / (movieInfo.totalReservationRate.totalReservationRate || 1)) * 100)}%</p>
                    {movieInfo.director || movieInfo.cast
                        ?
                        <>
                            <p>감독: {movieInfo.director.map(el => el) + ' '}</p>
                            <p>출연: {movieInfo.cast.slice(0, 5).map(el => el) + ' '}</p>
                        </>
                        :
                        <></>
                    }
                    <p>장르: {movieInfo.genres.reduce((acc, cur, idx) => {
                        if (idx !== 0) return acc + ', ' + cur.name
                        else return acc + cur.name
                    }, "")}</p>
                    <p>개봉일: {movieInfo.release_date}</p>
                    <div className="text-end">
                        <Link to={{
                            pathname: `/ticket`,
                            state: {
                                movieId: movieInfo.id,
                            }
                        }}>
                            <button className="btn btn-warning">예매하기</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <ul className="nav nav-tabs justify-content-center mt-4 border-0" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 0 ? "3px solid" : "none", borderBottomColor: state === 0 ? "#FEDC00" : "black" }} id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true" onClick={() => setState(0)}>상세정보</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 1 ? "3px solid" : "none", borderBottomColor: state === 1 ? "#FEDC00" : "black" }} id="stillcut-tab" data-bs-toggle="tab" data-bs-target="#stillcut" type="button" role="tab" aria-controls="stillcut" aria-selected="false" onClick={() => setState(1)}>예고편</button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                        <button className="nav-link mx-auto" style={{ color: "white", borderColor: "black", backgroundColor: "black", borderBottom: state === 2 ? "3px solid" : "none", borderBottomColor: state === 2 ? "#FEDC00" : "black" }} id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="false" onClick={() => setState(2)}>관람평</button>
                    </li> */}
                </ul>
            </div>
            <div className="tab-content text-center" id="myTabContent" style={{ color: "white" }}>
                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                    <div className="mt-5 pb-5 px-5">{movieInfo.overview}</div>
                </div>
                <div className="tab-pane fade" id="stillcut" role="tabpanel" aria-labelledby="stillcut-tab">
                    <Video movieId={movieInfo.id} />
                </div>
                {/* <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                    <div className="mt-5 pb-5 px-5">관람평</div>
                </div> */}
            </div>
        </div>

    )
}

export default MoviePage