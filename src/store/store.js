import { configureStore } from "@reduxjs/toolkit";
import localParamsReducer from './slices/localParams.slice.js'
import generalDataSlice from "./slices/generalData.slice.js";
import appRatingSlice from "./slices/appRating.slice.js";

const store = configureStore({
    reducer: {
        localParams: localParamsReducer,
        generalData: generalDataSlice,
        appRating: appRatingSlice
    }
})

export default store