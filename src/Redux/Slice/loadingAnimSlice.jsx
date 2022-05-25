import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    count: 0
};

const loadingAnimSlice = createSlice({
    name: 'loadingAnim',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
            state.count++;
        },
        stopLoading: (state) => {
            state.count--;
            if(state.count <= 0) {
                state.loading = false;
            }
        }
    }
});

export const {startLoading, stopLoading} = loadingAnimSlice.actions;

export default loadingAnimSlice.reducer;