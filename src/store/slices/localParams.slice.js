import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localParamsSlice = createSlice({
    name: 'localParamas',
    initialState: {
        language: null,
        theme: {
            colors: {
                prim1: '#394a51',
                prim2: '#7fa99b',
                sec1: '#fdc57b',
                sec2: '#fbf2d5'
            },
            fontName: 'Notes-Alarm'
        },
        adsInitialized: false,
        consentStatus: 'NOT_REQUIRED',
        drowerPsition: 'right',
        localParamsFetched: false,
        windowSize: null,
        safeArea: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    reducers: {
        setLanguage (state, action) {
            const language = action.payload || action.payload === 0 ? action.payload : state.language
            return {...state,  language }
        },
        setTheme (state, action) {
            const theme = action.payload || state.theme
            return {...state, theme }
        },
        setConsentStatus (state, action) {
            return {...state, consentStatus: action.payload}
        },
        setDrowerPosition (state, action) {
            return {...state, drowerPsition: action.payload}
        },
        setAdsInitialized (state, action) {
            return {...state, adsInitialized: action.payload}
        },
        setLocalParamsFetched (state, action) {
            return {...state, localParamsFetched: action.payload }
        },
        setWindowSize (state, action) {
            return {...state, windowSize: action.payload}
        },
        setSafeArea (state, action) {
            return {...state, safeArea: action.payload}
        }

    }
})

const saveLocalParamsThunk = () => {
    return (dispatch, getState) => {
        const localParams = getState().localParams
        const jsonPayload = JSON.stringify(localParams)
        
        AsyncStorage.setItem('local-params', jsonPayload)
        .catch(err => {
            console.log(err)
        })
    }
}

const getLocalParamsThunk = () => {
    return async (dispatch, getState) => {
            AsyncStorage.getItem('local-params')
            .then(result => {
                const value = JSON.parse(result)
                value && (value.language || value.language === 0) && dispatch(setLanguage(value.language))
                value && value.consentStatus && dispatch(setConsentStatus(value.consentStatus))
                value && value.windowSize && dispatch(setWindowSize(value.windowSize))
            })
            .catch(err => {
                console.log(err)
            })
            .finally(()=> {
                dispatch(setLocalParamsFetched(true))
            })

    }
}

const setLanguageThunk = language => {
    return (dispatch, getState) => {
        dispatch(setLanguage(language))
        dispatch(saveLocalParamsThunk())
    }
}

const setThemeThunk = theme => {
    return (dispatch, getState) => {
        dispatch(saveLocalParamsThunk())
    }
}

const setConsentStatusThunk = status => {
    return (dispatch, getState) => {
        dispatch(setConsentStatus(status))
        dispatch(saveLocalParamsThunk())
    }
}
const setWindowSizeThunk = windowSize => {
    return (dispatch, getState) => {
        dispatch(setWindowSize(windowSize))
        dispatch(saveLocalParamsThunk())
    }
}

export const { 
    setLanguage, 
    setTheme, 
    setLocalParamsFetched,
    setConsentStatus, 
    setWindowSize,
    setAdsInitialized,
    setDrowerPosition,
    setSafeArea
} = localParamsSlice.actions

export { 
    getLocalParamsThunk,
    saveLocalParamsThunk,
    setThemeThunk,
    setLanguageThunk,
    setConsentStatusThunk,
    setWindowSizeThunk
}

export default localParamsSlice.reducer