import axios from "axios"
import baseUrl from '../../utils/baseUrl'
import React, { useState, useEffect } from "react"
import "./box-office.module.scss"
// import "./mystyle.css"


const BoxOffice = () => {
    const [TMDB_TopRated_Data, setTMDB_TopRated_Data] = useState()
    useEffect(() => {
        getTMDB_TopRated()
        let items = document.querySelectorAll('.carousel-item')
        console.log("item", items)
        items.forEach((el) => {
            const minPerSlide = 4
            let next = el.nextElementSibling
            for (let i = 1; i < minPerSlide; i++) {
                if (!next) {
                    next = items[0]
                }
                let cloneChild = next.cloneNode(true)
                el.appendChild(cloneChild.children[0])
                next = next.nextElementSibling
            }
        })
    }, [])

    async function getTMDB_TopRated() {
        try {
            const response = await axios.get(`${baseUrl}/api/movie`)
            console.log(response.data)
            setTMDB_TopRated_Data(response.data)
        } catch (error) {

        }
    }

    return (
        <div className="container text-center my-3">
            {console.log(TMDB_TopRated_Data)}
            <div className="row my-auto justify-content-center">
                <div id="recipeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="999999999">
                    <div className={`carousel-inner`} role="listbox">
                        {TMDB_TopRated_Data?
                        TMDB_TopRated_Data.results.map((moviePoster,index)=>(
                            <div className={`carousel-item ${index===0?"active":""}`}>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-img">
                                        <img src={`https://image.tmdb.org/t/p/original${moviePoster.poster_path}`} className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                    :(<div>영화를 불러올 수 없습니다:(</div>)}
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

        // <div className="container">
        //     <h2 className="fw-bold text-white text-center mt-5">Box Office</h2>
        //     <div id="multi-carousel" className={`d-flex carousel slide align-items-center ${styles.customHeight}`} data-bs-ride="carousel">
        //         <div className="carousel-inner row">
        //             <div className="carousel-item active">
        //                 <div className="col-sm-3">
        //                     <div className="card bg-dark">
        //                         <div className={`card-img ${styles.cursor} ${styles.showplot}`}>
        //                             <img src="//via.placeholder.com/500x400/31f?text=1" className="img-fluid" />
        //                         </div>
        //                         <div className={`card-img-overlay text-white ${styles.dNone}`}>Slide 1</div>
        //                         <button className="btn btn-warning text-white my-1" onClick={(e) => console.log("click", e)}>예매하기</button>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <div className="col-sm-3">
        //                     <div className="card bg-dark">
        //                         <div className={`card-img ${styles.cursor} ${styles.showplot}`}>
        //                             <img src="//via.placeholder.com/500x400/e66?text=2" className="img-fluid" />
        //                         </div>
        //                         <div className={`card-img-overlay text-white ${styles.dNone}`}>Slide 2</div>
        //                         <button className="btn btn-warning text-white my-1" onClick={(e) => console.log("click", e)}>예매하기</button>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <div className="col-sm-3">
        //                     <div className="card bg-dark">
        //                         <div className={`card-img ${styles.cursor} ${styles.showplot}`}>
        //                             <img src="//via.placeholder.com/500x400/7d2?text=3" className="img-fluid" />
        //                         </div>
        //                         <div className={`card-img-overlay text-white ${styles.dNone}`}>Slide 3</div>
        //                         <button className="btn btn-warning text-white my-1" onClick={(e) => console.log("click", e)}>예매하기</button>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <div className="col-sm-3">
        //                     <div className="card bg-dark">
        //                         <div className={`card-img ${styles.cursor} ${styles.showplot}`}>
        //                             <img src="//via.placeholder.com/500x400?text=4" className="img-fluid" />
        //                         </div>
        //                         <div className={`card-img-overlay text-white ${styles.dNone}`}>Slide 4</div>
        //                         <button className="btn btn-warning text-white my-1" onClick={(e) => console.log("click", e)}>예매하기</button>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <div className="col-sm-3">
        //                     <div className="card bg-dark">
        //                         <div className={`card-img ${styles.cursor} ${styles.showplot}`}>
        //                             <img src="//via.placeholder.com/500x400/aba?text=5" className="img-fluid" />
        //                         </div>
        //                         <div className={`card-img-overlay text-white ${styles.dNone}`}>Slide 5</div>
        //                         <button className="btn btn-warning text-white my-1" onClick={(e) => console.log("click", e)}>예매하기</button>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <div className="col-sm-3">
        //                     <div className="card bg-dark">
        //                         <div className={`card-img ${styles.cursor} ${styles.showplot}`}>
        //                             <img src="//via.placeholder.com/500x400/fc0?text=6" className="img-fluid" />
        //                         </div>
        //                         <div className={`card-img-overlay text-white ${styles.dNone}`}>Slide 6</div>
        //                         <button className="btn btn-warning text-white my-1" onClick={(e) => console.log("click", e)}>예매하기</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <button className="carousel-control-prev" type="button" data-bs-target="#multi-carousel" data-bs-slide="prev">
        //             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //             <span className="visually-hidden">Previous</span>
        //         </button>
        //         <button className="carousel-control-next" type="button" data-bs-target="#multi-carousel" data-bs-slide="next">
        //             <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //             <span className="visually-hidden">Next</span>
        //         </button>
        //     </div>
        // </div>
    )
}

export default BoxOffice