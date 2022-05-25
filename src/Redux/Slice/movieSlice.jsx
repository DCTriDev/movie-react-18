import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import httpService from "../../API/userAPI";

const initialState = {
    listMovie: null,
    listCinema: null,
}

export const fetchListMovie = createAsyncThunk('movie/fetchListMovie', async () => {
    const response = await httpService.getListMovies()
    console.log(response)
    return response.data.content;
});

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setListMovie: (state, action) => {
            state.listMovie = action.payload
        },
        setListCinema: (state, action) => {
            state.listCinema = action.payload
        },
    },
    extraReducers:(builder) => {
        builder.addCase(
            fetchListMovie.fulfilled, (state, action) => {
                state.listMovie = action.payload
            })
    }

})

export const setListMovieAction = () => {
    return (dispatch) => httpService.getListMovies()
        .then(res => {
            dispatch(movieSlice.actions.setListMovie(res.data.content))
        })
        .catch(err => console.log(err))
}

export const setListCinemaAction = () => {
    return (dispatch) => httpService.getListCinema()
        .then(res => {
            dispatch(movieSlice.actions.setListCinema(res.data.content))
        })
        .catch(err => console.log(err))
}

export default movieSlice.reducer;
