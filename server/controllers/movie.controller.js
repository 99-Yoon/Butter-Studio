import axios from 'axios'

const comparePopularMovie = async (req, res) => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1477348488076cafd4dcf973a314957d&language=ko-KR')
    const movies = response.data
    // console.log('movies', movies)
    try {
        res.json(movies)
    } catch (error) {
        
    }
}

export default { comparePopularMovie }