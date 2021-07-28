import { useState, useEffect } from "react"
import movieApi from '../../apis/movie.api.js'
import "./box-office.module.css"

const BoxOffice = () => {
    const [TMDB_TopRated_Data, setTMDB_TopRated_Data] = useState()
    useEffect(() => {
        // getTMDB_TopRated()
        let items = document.querySelectorAll('.carousel .carousel-item')
        // console.log("item", items)
        items.forEach((el) => {
            const minPerSlide = 4
            let next = el.nextElementSibling
            for (let i = 1; i < minPerSlide; i++) {
                if (!next) {
                    // wrap carousel by using first child
                    next = items[0]
                }
                let cloneChild = next.cloneNode(true)
                el.appendChild(cloneChild.children[0])
                next = next.nextElementSibling
            }
        })
    }, [])

    async function getTMDB_TopRated() {
        const category = "popular"
        try {
            const data = await movieApi.getMoviesfromTM(category)
            console.log(data)
            setTMDB_TopRated_Data(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container text-center my-3">
            <div className="container text-center my-3">
                <h2 className="font-weight-light">Bootstrap Multi Slide Carousel</h2>
                <div className="row mx-auto my-auto justify-content-center">
                    <div id="recipeCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="//via.placeholder.com/500x400/31f?text=1" className="img-fluid" />
                                        </div>
                                        <div className="card-img-overlay">Slide 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="//via.placeholder.com/500x400/e66?text=2" className="img-fluid" />
                                        </div>
                                        <div className="card-img-overlay">Slide 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="//via.placeholder.com/500x400/7d2?text=3" className="img-fluid" />
                                        </div>
                                        <div className="card-img-overlay">Slide 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="//via.placeholder.com/500x400?text=4" className="img-fluid" />
                                        </div>
                                        <div className="card-img-overlay">Slide 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="//via.placeholder.com/500x400/aba?text=5" className="img-fluid" />
                                        </div>
                                        <div className="card-img-overlay">Slide 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="//via.placeholder.com/500x400/fc0?text=6" className="img-fluid" />
                                        </div>
                                        <div className="card-img-overlay">Slide 6</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </a>
                        <a className="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
                <h5 className="mt-2 fw-light">advances one slide at a time</h5>
            </div>
            <div className="row my-auto justify-content-center">
                <div id="recipeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="999999999">
                    <div className={`carousel-inner`} role="listbox">
                        {TMDB_TopRated_Data ?
                            TMDB_TopRated_Data.map((moviePoster, index) => (
                                <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <div className="col-sm-3">
                                        <div className="card">
                                            <div className="card-img">
                                                <img src={`https://image.tmdb.org/t/p/original${moviePoster.poster_path}`} className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : (<div>영화를 불러올 수 없습니다:(</div>)}
                    </div>
                    <a className="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a className="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BoxOffice