import Axios from './axiosClient'
import {print} from 'graphql'
import gql from 'graphql-tag'

const GET_ALL_MOVIE = gql`
    query getAllMovie{
        movie {
            id
            image
            title
            type
            status
        }
    }
`

const GET_DETAIL_MOVIE = gql`
    mutation getDetailMovie($id: Int!) {
        getDetailMovie(input:{id: $id}) {
            id
            image
            title
            director
            trailer
            description
            releaseDate
            price
            type
            status
            category{
                categoryName
            }
            isPurchased
            actor{
                id
                name
                image
            }
        }
    }
`

class MovieAPI {
    getAllMovie = (setLoading = true) => {
        const payload = {
            query: print(GET_ALL_MOVIE),
        }
        return Axios.postMethod(payload, setLoading)
    }

    getDetailMovie = (id, setLoading = true) => {
        const payload = {
            query: print(GET_DETAIL_MOVIE),
            variables:{
                id: +id
            }
        }
        return Axios.postMethod(payload, setLoading)
    }
}

const movieService = new MovieAPI();

export default movieService;
