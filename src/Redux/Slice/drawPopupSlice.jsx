import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    componentContent: null,
};

const drawPopupSlice = createSlice({
    name: 'drawPopup',
    initialState,
    reducers: {
        openDrawPopup: (state) => {
            state.visible = true;
        },
        closeDrawPopup: (state) => {
            state.visible = false;
        },
        setDrawPopupContent: (state, action) => {
            if(!action.payload){
                state.componentContent = action.payload;
            }
        },
    }
});

export const {openDrawPopup, closeDrawPopup, setDrawPopupContent} = drawPopupSlice.actions;

export default drawPopupSlice.reducer;