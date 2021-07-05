import React, { useState, useEffect } from 'react'
import MovieChart from '../components/MovieChart'
import MovieComming from '../components/MovieComming'
const MovieListPage = () => {
    const navtabStyle = {
    }
    return (
        <div className="container">
            <ul className="nav nav-tabs row justify-content-center my-3 border-0" id="myTab" role="tablist">
                <li className="nav-item col-5" role="presentation">
                    <button className="nav-link active mx-auto" id="moviechart-tab" data-bs-toggle="tab" data-bs-target="#moviechart" type="button" role="tab" aria-controls="moviechart" aria-selected="true">무비차트</button>
                </li>
                <li className="nav-item col-5" role="presentation">
                    <button className="nav-link mx-auto" id="moviecomming-tab" data-bs-toggle="tab" data-bs-target="#moviecomming" type="button" role="tab" aria-controls="moviecomming" aria-selected="false">상영예정작</button>
                </li>
            </ul>
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