import { useEffect, useState } from 'react'
import movieApi from '../apis/movie.api.js'
import catchErrors from "../utils/catchErrors.js"

const Video = ({ movieId }) => {
    const [videoUrls, setVideoUrls] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getVideos()
    }, [])

    async function getVideos() {
        try {
            const data = await movieApi.getVideosfromTM(movieId)
            setVideoUrls(data)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    return (
        <div>
            {videoUrls.length > 0
                ? videoUrls.map(el => (
                    <div className="mt-5 pb-5">
                        <p>{el.name}</p>
                        <div class="ratio ratio-16x9">
                            <iframe src={`https://www.youtube.com/embed/${el.key}`} title="YouTube video" allowFullScreen></iframe>
                        </div>
                    </div>
                ))
                : <div>예고편 정보가 존재하지 않습니다.</div>}
        </div>
    )
}

export default Video