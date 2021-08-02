import axios from "axios"
import {useState, useEffect} from 'react'
import catchErrors from "../utils/catchErrors"

const TheaterInfo = () => {
    const [theaterInfo, setTheaterInfo] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        getTheaterInfo()
    }, [])

    async function getTheaterInfo() {
        try {
            const response = await axios.get('/api/info/cinema')
            console.log(response.data)
            setTheaterInfo(response.data)
        } catch (error) {
            catchErrors(error,setError)
        }
    }

    return (
        <>
            {/* <h3>{theaterInfo.cinemaName}</h3> */}
            <div>총 상영관 수: </div>
            {/* <div>{theaterInfo.address}</div> */}
        </>
    )
}

export default TheaterInfo