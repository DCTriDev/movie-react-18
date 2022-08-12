import Axios from './axiosClient'
import {print} from 'graphql'
import gql from 'graphql-tag'

const GET_ALL_MOVIE = gql`
    query getAllMovieAdmin {
        getAllMovieAdmin{
            id
            title
            trailer
            image
            movieSource{
                detailSource
                id
                movieId
                source
            }
            price
            director
            description
            actor{
                name
                image
                id
            }
            category{
                categoryName
            }
            status
            releaseDate
        }
    }
`

const UPDATE_MOVIE_BASIC = gql`
    mutation updateMovieBasic($id: Int!, $title: String, $image: String, $description: String, $releaseDate: String, $director: String, $status: String, $price: Int) {
        updateMovieBasic(input:{id: $id, title: $title, image: $image, description: $description, releaseDate: $releaseDate, director: $director, status: $status, price: $price}) {
            id
        }
    }
`

class AdminAPI {
    getAllMovie = (setLoading = true) => {
        const payload = {
            query: print(GET_ALL_MOVIE),
        }
        return Axios.postMethod(payload, setLoading)
    }

    updateMovieBasic = (data, setLoading = true) => {
        console.log("data", data)
        const payload = {
            query: print(UPDATE_MOVIE_BASIC),
            variables: {
                id: data.id,
                title: data.title,
                image: data.image,
                description: data.description,
                releaseDate: data.releaseDate,
                director: data.director,
                status: data.status,
                price: data.price,
            }
        }
        return Axios.postMethod(payload, setLoading)
    }

}

const adminService = new AdminAPI()

export default adminService
