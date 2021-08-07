import { useState, useEffect } from "react"
import BoxOffice from "../components/BoxOffice";
import Collection from "../components/Collection";
import Footer from "../components/Footer";
import movieApi from '../apis/movie.api'
import catchErrors from '../utils/catchErrors.js'

const HomePage = () => {
    const [TMDB_TopRated_Data, setTMDB_TopRated_Data] = useState([])
    const [error, setError] = useState("")
    const category = "popular"

    useEffect(() => {
        getTMDB_TopRated()
    }, [])

    async function getTMDB_TopRated() {
        try {
            setError("")
            const data = await movieApi.getListByCategoryfromDB(category)
            console.log("sdad==", data)
            data.sort(function (a, b) {
                return b.popularity - a.popularity
            })
            setTMDB_TopRated_Data([...data])
        } catch (error) {
            catchErrors(error, setError)
        }
    }
    return (
        <>
            <BoxOffice TMDB_TopRated_Data={TMDB_TopRated_Data}  />
            <Collection  TMDB_TopRated_Data={TMDB_TopRated_Data} />
            <Footer />
        </>
    )
}

export default HomePage