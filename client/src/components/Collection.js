import { useEffect, useState } from 'react'
import movieApi from '../apis/movie.api.js'
import catchErrors from '../utils/catchErrors.js'

const Collection = ({ TMDB_TopRated_Data }) => {
    const [videoUrls, setVideoUrls] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        if (TMDB_TopRated_Data.length > 0) {
            getVideos()
        }
    }, [TMDB_TopRated_Data])

    async function getVideos() {
        try {
            const data = await movieApi.getVideosfromTM(TMDB_TopRated_Data[0].id)
            setVideoUrls(data)
        } catch (error) {
            catchErrors(error, setError)
        }
    }
    return (
        <>
            <h2 className="fw-bold text-white text-center my-5">Movie Collection</h2>
            <div className="row justify-content-sm-center" style={{ marginBottom: "8rem" }}>
                <div className="col-sm-8">
                    {videoUrls.length > 0
                        ?
                        <div className="ratio ratio-16x9">
                            <iframe src={`https://www.youtube.com/embed/${videoUrls[0].key}`} title="YouTube video" allowFullScreen></iframe>
                        </div>
                        : <div className="text-center">예고편 정보가 존재하지 않습니다.</div>}
                </div>
                <div className="col-sm-3">
                    {TMDB_TopRated_Data.length > 0
                        ?
                        <img src={`https://image.tmdb.org/t/p/original${TMDB_TopRated_Data[0].poster_path}`} className="img-fluid bg-black" />
                        :
                        <div></div>
                    }
                </div>
            </div>
        </>
    )
}

export default Collection