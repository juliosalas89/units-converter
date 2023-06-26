import { configureStore } from "@reduxjs/toolkit";
import localParamsReducer from './slices/localParams.slice.js'
import generalDataSlice from "./slices/generalData.slice.js";

const store = configureStore({
    reducer: {
        localParams: localParamsReducer,
        generalData: generalDataSlice
    }
})

export default store