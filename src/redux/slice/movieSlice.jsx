import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import movieService from '@api/movieAPI'

const initialState = {
  listMovie: null,
}

export const fetchListMovie = createAsyncThunk('movie/fetchListMovie', async () => {
  const response = await movieService.getAllMovie()
  return response.data.movie
})

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {
    setListMovie: (state, action) => {
      state.listMovie = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchListMovie.fulfilled, (state, action) => {
        state.listMovie = action.payload
      })
  },

})

export default movieSlice.reducer
