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

const GET_ALL_USER = gql`
    query getAllUser {
        user {
            id
            username
            avatar
            email
            birthday
            phoneNumber
            fullName
            roleName
            genderId
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

const UPDATE_USER_ADMIN = gql`
    mutation updateUserAdmin(
        $id: Int!,
        $username: String,
        $avatar: String,
        $birthday: String,
        $email: String,
        $fullName: String,
        $phoneNumber: String,
        $roleName: String,
    ) {
        updateUserAdmin(input:{
            id: $id,
            username: $username,
            avatar: $avatar,
            birthday: $birthday,
            email: $email,
            fullName: $fullName,
            phoneNumber: $phoneNumber,
            roleName: $roleName,
        }) {
            status
        }
    }
`

const DELETE_USER_ADMIN = gql`
    mutation deleteUserAdmin($id: Int!) {
        deleteUserAdmin(input:{id: $id}) {
            status
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

    getAllUser = (setLoading = true) => {
        const payload = {
            query: print(GET_ALL_USER),
        }
        return Axios.postMethod(payload, setLoading)
    }

    updateMovieBasic = (data, setLoading = true) => {
        console.log('data', data)
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
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    updateUserAdmin = (data, setLoading = true) => {
        const payload = {
            query: print(UPDATE_USER_ADMIN),
            variables: {
                id: data.id,
                username: data.username,
                avatar: data.avatar,
                birthday: data.birthday,
                email: data.email,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                roleName: data.roleName,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    deleteUserAdmin = (id, setLoading = true) => {
        const payload = {
            query: print(DELETE_USER_ADMIN),
            variables: {
                id: id,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

}

const adminService = new AdminAPI()

export default adminService
