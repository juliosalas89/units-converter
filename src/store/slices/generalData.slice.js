import { createSlice } from "@reduxjs/toolkit";

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState: {
        drowerVisible: false
    },
    reducers: {
        setDrowerVisible (state, action) {
            return {...state, drowerVisible: action.payload }
        },
    }
})


export const { 
    setDrowerVisible, 
} = generalDataSlice.actions

export default generalDataSlice.reducer