import { configureStore } from "@reduxjs/toolkit";
import localParamsReducer from './slices/localParams.slice.js'

const store = configureStore({
    reducer: {
        localParams: localParamsReducer
    }
})

export default store