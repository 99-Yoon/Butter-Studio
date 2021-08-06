import { useState, useEffect } from "react"
import movieApi from '../../apis/movie.api.js'

const BoxOffice = () => {
    const [TMDB_TopRated_Data, setTMDB_TopRated_Data] = useState([])
    useEffect(() => {
        getTMDB_TopRated()
    }, [])

    async function getTMDB_TopRated() {
        const category = "popular"
        try {
            const data = await movieApi.getListByCategoryfromDB(category)
            console.log(data)
            setTMDB_TopRated_Data([...data])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container text-center my-3">
            {/* <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {TMDB_TopRated_Data.length>0
                        ?
                        TMDB_TopRated_Data.map((movie, index) => {
                            <div  className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                {console.log(movie.poster_path)}
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="d-block w-100" alt="Movie Poster"/>
                            </div>
                        })
                        :
                        <div className="carousel-item">
                            {console.log("스틸컷 불러오기 오류")}
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
            </div> */}

        </div>
    )
}

export default BoxOffice