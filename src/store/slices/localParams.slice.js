import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localParamsSlice = createSlice({
    name: 'localParamas',
    initialState: {
        language: 0,
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

const setAndSaveLanguageThunk = language => {
    return async (dispatch, getState) => {
        try {
            const jsonPayload = JSON.stringify(language)
            await AsyncStorage.setItem('user-preferences-language', jsonPayload);
            dispatch(setLanguage(language))
        } catch (error) {
            console.log(error)
        }
    }
}

const saveThemeThunk = theme => {
    return async (dispatch, getState) => {
        try {
            const jsonPayload = JSON.stringify(theme)
            await AsyncStorage.setItem('user-preferences-theme', jsonPayload);
        } catch (error) {
            console.log(error)
        }
    }
}

const setAndSaveConsentStatusThunk = status => {
    return async (dispatch, getState) => {
        try {
            dispatch(setConsentStatus(status))
            const jsonPayload = JSON.stringify(status)
            await AsyncStorage.setItem('user-consent-status', jsonPayload);
        } catch (error) {
            console.log(error)
        }
    }
}

const getUserPreferencesThunk = () => {
    return async (dispatch, getState) => {
        try {
            const language = JSON.parse(await AsyncStorage.getItem('user-preferences-language'));
            const theme = JSON.parse(await AsyncStorage.getItem('user-preferences-theme'));
            const consentStatus = JSON.parse(await AsyncStorage.getItem('user-consent-status'));
            
            (language || language === 0) && dispatch(setLanguage(language))
            theme && dispatch(setTheme(theme))
            consentStatus && dispatch(setConsentStatus(consentStatus))
            dispatch(setLocalParamsFetched(true))
        } catch (error) {
            dispatch(setLocalParamsFetched(true))
            console.log(error)
        }
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
    saveThemeThunk,
    setAndSaveLanguageThunk,
    setAndSaveConsentStatusThunk,
    getUserPreferencesThunk
}

export default localParamsSlice.reducer