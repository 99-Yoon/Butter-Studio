import axios from "axios"
import { baseUrl } from '../../utils/baseUrl.js'
import { useState, useEffect } from "react"
import styles from "./box-office.module.scss"

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
            {console.log(typeof (TMDB_TopRated_Data))}
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