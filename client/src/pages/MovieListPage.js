import React, { useState, useEffect } from 'react'
import MovieChart from '../components/MovieChart/MovieChart'
import MovieComming from '../components/MovieComming/MovieComming'
const MovieListPage = () => {
    const [state, setState] = useState(true)
    return (
        <div className="container">
            <div className="">
                <ul className="nav nav-tabs justify-content-center my-4 border-0" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active mx-auto" style={{color:"white", borderColor: "black", backgroundColor:"black", borderBottom: state? "3px solid":"none" ,borderBottomColor:state?"#FEDC00":"black"}} id="moviechart-tab" data-bs-toggle="tab" data-bs-target="#moviechart" type="button" role="tab" aria-controls="moviechart" aria-selected="true" onClick={() => setState(true)}>무비차트</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link mx-auto" style={{color:"white", borderColor: "black",backgroundColor:"black", borderBottom: state?"none" :"3px solid", borderBottomColor:state?"black": "#FEDC00"}} id="moviecomming-tab" data-bs-toggle="tab" data-bs-target="#moviecomming" type="button" role="tab" aria-controls="moviecomming" aria-selected="false" onClick={() => setState(false)}>상영예정작</button>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="moviechart" role="tabpanel" aria-labelledby="moviechart-tab">
                    <MovieChart />
                </div>
                <div className="tab-pane fade" id="moviecomming" role="tabpanel" aria-labelledby="moviecomming-tab">
                    <MovieComming />
                </div>
            </div>
        </div>
    )
}

export default MovieListPage