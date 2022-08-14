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

const GET_ALL_ACTOR = gql`
    query getAllActor {
        actor {
            id
            name
            image
            birthday
            genderId
        }
    }
`

const UPDATE_ACTOR = gql`
    mutation updateActor($id: Int!, $name: String, $image: String, $birthday: String, $genderId: Int) {
        updateActor(input:{id: $id, name: $name, image: $image, birthday: $birthday, genderId: $genderId}) {
            status
        }
    }
`

const INSERT_ACTOR = gql`
    mutation insertActor(
        $name: String,
        $image: String,
        $birthday: String,
        $genderId: Int
    ) {
        insertActor(input:{
            name: $name,
            image: $image,
            birthday: $birthday,
            genderId: $genderId
        }) {
            status
        }
    }
`

const DELETE_ACTOR = gql`
    mutation deleteActor($id: Int!) {
        deleteActor(input:{id: $id}) {
            status
        }
    }
`

const UPDATE_MOVIE_ACTOR = gql`
    mutation updateMovieActor($movieId: Int!, $actorIdArr: [Int]) {
        updateMovieActor(input:{movieId: $movieId, actorIdArr: $actorIdArr}) {
            status
        }
    }
`

const GET_ALL_CATEGORY = gql`
    query getAllCategory {
        category {
            id
            categoryName
        }
    }
`

const INSERT_MOVIE = gql`
    mutation insertMovie(
        $title: String!
        $image: String
        $description: String
        $director: String
        $trailer: String
        $releaseDate: String
        $price: Int
        $movieTypeId: Int
        $movieStatusId: Int
        $categoryId: [Int]
        $actorId: [Int]
        $source: [Source]
    ) {
        insertMovie(input:{
            title: $title,
            image: $image,
            description: $description,
            director: $director,
            trailer: $trailer,
            releaseDate: $releaseDate,
            price: $price,
            movieTypeId: $movieTypeId,
            movieStatusId: $movieStatusId,
            categoryId: $categoryId,
            actorId: $actorId,
            source: $source
        }) {
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

    getAllActor = (setLoading = true) => {
        const payload = {
            query: print(GET_ALL_ACTOR),
        }
        return Axios.postMethod(payload, setLoading)
    }

    updateActor = (data, setLoading = true) => {
        const payload = {
            query: print(UPDATE_ACTOR),
            variables: {
                id: data.id,
                name: data.name,
                image: data.image,
                birthday: data.birthday,
                genderId: data.genderId,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    insertActor = (data, setLoading = true) => {
        const payload = {
            query: print(INSERT_ACTOR),
            variables: {
                name: data.name,
                image: data.image,
                birthday: data.birthday,
                genderId: data.genderId,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    deleteActor = (id, setLoading = true) => {
        const payload = {
            query: print(DELETE_ACTOR),
            variables: {
                id: id,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    updateMovieActor = (data, setLoading = true) => {
        const payload = {
            query: print(UPDATE_MOVIE_ACTOR),
            variables: {
                movieId: data.id,
                actorIdArr: data.actor,
            },
        }
        console.log(payload)
        return Axios.postMethod(payload, setLoading)
    }

    getAllCategory = (setLoading = true) => {
        const payload = {
            query: print(GET_ALL_CATEGORY),
        }
        return Axios.postMethod(payload, setLoading)
    }

    insertMovie = (data, setLoading = true) => {
        const payload = {
            query: print(INSERT_MOVIE),
            variables: {
                title: data.title,
                image: data.image,
                description: data.description,
                director: data.director,
                trailer: data.trailer,
                releaseDate: data.releaseDate,
                price: data.price,
                movieTypeId: data.movieTypeId,
                movieStatusId: data.movieStatusId,
                categoryId: data.categoryId,
                actorId: data.actorId,
                source: data.source,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

}

const adminService = new AdminAPI()

export default adminService
