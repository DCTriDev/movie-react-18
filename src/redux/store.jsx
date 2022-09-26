import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slice/userSlice'
import movieSlice from './slice/movieSlice'
import loadingAnimSlice from './slice/loadingAnimSlice'
import drawPopupSlice from './slice/drawPopupSlice'

const store = configureStore({
  reducer: {
    loadingAnimSlice,
    drawPopupSlice,
    userSlice,
    movieSlice,
  },
  devTools: true,
})

export default store
