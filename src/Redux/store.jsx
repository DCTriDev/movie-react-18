import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import movieSlice from "./Slice/movieSlice";
import loadingAnimSlice from "./Slice/loadingAnimSlice";
import drawPopupSlice from "./Slice/drawPopupSlice";


const store = configureStore({
    reducer: {
        loadingAnimSlice,
        drawPopupSlice,
        userSlice,
        movieSlice,
    },
    devTools: true
});

export default store;