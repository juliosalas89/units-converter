import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appRatingSlice = createSlice({
    name: 'generalData',
    initialState: {
        installDate: null,
        timesAppUsed: 0,
        appRated: false,
        remindMeDate: null,
        appRatingFetched: false,
        ratingModalVisible: false
    },
    reducers: {
        setInstallDate (state, action) {
            return {...state, installDate: action.payload }
        },
        setAppRated (state, action) {
            return {...state, appRated: action.payload }
        },
        setRemindMeDate (state, action) {
            return {...state, remindMeDate: action.payload }
        },
        setTimesAppUsed (state, action) {
            return {...state, timesAppUsed: action.payload }
        },
        setAppRatingFetched (state, action) {
            return {...state, appRatingFetched: action.payload }
        },
        setRatingModalVisible (state, action) {
            return {...state, ratingModalVisible: action.payload }
        }
    }
})

const saveAppRatingThunk = () => {
    return (dispatch, getState) => {
        const appRating = getState().appRating
        const jsonPayload = JSON.stringify(appRating)
        
        AsyncStorage.setItem('app-rating-data', jsonPayload)
        .catch(err => {
            console.log(err)
        })
    }
}

const getAppRatingThunk = () => {
    return async (dispatch, getState) => {
        AsyncStorage.getItem('app-rating-data')
        .then(result => {
            const value = JSON.parse(result)
            value && value.installDate && dispatch(setInstallDate(value.installDate))
            value && value.timesAppUsed && dispatch(setTimesAppUsed(value.timesAppUsed))
            value && value.appRated && dispatch(setAppRated(value.appRated))
            value && value.remindMeDate && dispatch(setRemindMeDate(value.remindMeDate))
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setAppRatingFetched(true))
        })
    }
}

const setInstallDateThunk = language => {
    return (dispatch, getState) => {
        dispatch(setInstallDate(language))
        dispatch(saveAppRatingThunk())
    }
}
const adTimesAppUsedThunk = () => {
    return (dispatch, getState) => {
        const timesAppUsed = getState().appRating.timesAppUsed
        dispatch(setTimesAppUsed(timesAppUsed + 1))
        dispatch(saveAppRatingThunk())
    }
}
const setAppRatedThunk = appRated => {
    return (dispatch, getState) => {
        dispatch(setAppRated(appRated))
        dispatch(saveAppRatingThunk())
    }
}
const setRemindMeDateThunk = remindMeDate => {
    return (dispatch, getState) => {
        dispatch(setRemindMeDate(remindMeDate))
        dispatch(saveAppRatingThunk())
    }
}

export const { 
    setInstallDate,
    setAppRated,
    setRemindMeDate,
    setTimesAppUsed,
    setAppRatingFetched,
    setRatingModalVisible
} = appRatingSlice.actions

export { 
    getAppRatingThunk,
    setInstallDateThunk,
    adTimesAppUsedThunk,
    setAppRatedThunk,
    setRemindMeDateThunk
}

export default appRatingSlice.reducer