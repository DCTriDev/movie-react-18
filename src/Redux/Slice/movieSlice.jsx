import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import movieService from "../../API/movieAPI";

const initialState = {
    listMovie: null,
}

export const fetchListMovie = createAsyncThunk('movie/fetchListMovie', async () => {
    const response = await movieService.getAllMovie()
    console.log(response.data.movie)
    return response.data.movie;
});

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setListMovie: (state, action) => {
            state.listMovie = action.payload
        },
    },
    extraReducers:(builder) => {
        builder.addCase(
            fetchListMovie.fulfilled, (state, action) => {
                state.listMovie = action.payload
            })
    }

})

// export const setListCinemaAction = () => {
//     return (dispatch) => movieService.getListCinema()
//         .then(res => {
//             dispatch(movieSlice.actions.setListCinema(res.data.content))
//         })
//         .catch(err => console.log(err))
// }

export default movieSlice.reducer;
