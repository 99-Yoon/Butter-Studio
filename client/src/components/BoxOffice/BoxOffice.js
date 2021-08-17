import { Link } from "react-router-dom"

const BoxOffice = ({ TMDB_TopRated_Data }) => {

    return (
        <div className="container text-center my-3">
            <h2 className="fw-bold text-white text-center my-5">BoxOffice</h2>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {TMDB_TopRated_Data.length > 0
                        ?
                        TMDB_TopRated_Data.map((movie, index) =>
                            <div className={`carousel-item ${index === 0 ? " active" : ""}`}>
                                <Link to={{
                                    pathname: `/movie/${movie.id}`,
                                    state: {
                                        ...movie
                                    }
                                }}
                                >
                                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} style={{ width: "200px" }} className="" alt="Movie Poster" />

                                </Link>
                                <div className="mt-1 text-white">{index + 1}위</div>
                            </div>
                        )
                        :
                        <div className="carousel-item">
                            <img src="/images/none.jpg" className="d-block w-100" alt="등록된 스틸컷이 없습니다." />
                        </div>
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}

export default BoxOffice