import { useEffect, useState } from 'react'
import movieApi from '../apis/movie.api.js'
const Video = (props) => {
    const [videoUrls, setVideoUrls] = useState([])
    useEffect(() => {
        getVideos()
    }, [])

    async function getVideos() {
        try {
            const data = await movieApi.getVideosfromTM(props.movieId)
            setVideoUrls(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {videoUrls.length > 0
                ? videoUrls.map(el => (
                    <div className="my-5">
                        <p>{el.name}</p>
                        <div class="ratio ratio-16x9">
                            <iframe src={`https://www.youtube.com/embed/${el.key}`} title="YouTube video" allowfullscreen></iframe>
                        </div>
                    </div>
                ))
                : <div>예고편 정보가 존재하지 않습니다.</div>}
        </div>
    )
}

export default Video