import axios from "axios"
import authHeader from "./authHeader"

const getAllPrivateMovies = async () => {
    const headers = await authHeader()
    return axios.get(`https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/movies`, { headers })
}

const movieService = {
    getAllPrivateMovies
}

export default movieService