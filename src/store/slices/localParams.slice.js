import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localParamsSlice = createSlice({
    name: 'localParamas',
    initialState: {
        language: null,
        theme: {
            name: "Default",
            cardLinesWidth: 0.8,
            cardFontWeight: "normal",
            colors: {
                selectedLanguageBg: "#7fa99b",
                selectedLanguageText: "#ffff",
                modalBg: "#ffff",
                modalText: "#394a51",
                modalDescription: "#7fa99b",
                modalBorder: "#394a51",
                modalLine: "#7fa99b",
                modalPressColor: "#7fa99b",
                cancelButton: "#fbf2d5",
                confirmButton: "#7fa99b",
                cancelButtonText: "#7fa99b",
                confirmButtonText: "#fbf2d5",
                cardText: "#fdc57b",
                cardTextSelected: "#fbf2d5",
                cardLine: "#fdc57b",
                cardBg: "#fbf2d5",
                cardBgSelected: "#fdc57b",
                favStarFill: "#ffe040",
                favStarStroke: "#000000",
                unitButton: "#7fa99b",
                unitButtonText: "#fbf2d5",
                inputText: "#394a51",
                inputBorder: "#7fa99b",
                headerBg: "#394a51",
                headerText: "#ffff",
                drowerIcons: "#394a51",
                drowerText: "#394a51",
                drowerBg: "#ffff",
                drowerButton: "#7fa99b",
                drowerButtonText: "#fbf2d5"
            },
            fontName: 'Notes-Alarm'
        },
        adsInitialized: false,
        consentStatus: 'NOT_REQUIRED',
        drawerPosition: 'right',
        localParamsFetched: false,
        windowSize: null,
    },
    reducers: {
        setLanguage (state, action) {
            const language = action.payload || action.payload === 0 ? action.payload : state.language
            return {...state,  language }
        },
        setTheme (state, action) {
            const newTheme = action.payload || state.theme
            const theme = state.theme
            return {
                ...state, 
                theme: { 
                    ...theme,
                    cardFontWeight: newTheme.cardFontWeight,
                    cardLinesWidth: newTheme.cardLinesWidth,
                    name: newTheme.name || theme.name, 
                    colors: { ...theme.colors, ...newTheme.colors },
                    fontName: newTheme.fontName || theme.fontName,
                } 
            }
        },
        setConsentStatus (state, action) {
            return {...state, consentStatus: action.payload}
        },
        setDrawerPosition (state, action) {
            return {...state, drawerPosition: action.payload}
        },
        setAdsInitialized (state, action) {
            return {...state, adsInitialized: action.payload}
        },
        setLocalParamsFetched (state, action) {
            return {...state, localParamsFetched: action.payload }
        },
        setWindowSize (state, action) {
            return {...state, windowSize: action.payload}
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
            value && value.theme && dispatch(setTheme(value.theme))
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

const setDrawerPositionThunk = drowerPosition => {
    return (dispatch, getState) => {
        dispatch(setDrawerPosition(drowerPosition))
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
    setDrawerPosition,
    setSafeArea
} = localParamsSlice.actions

export { 
    getLocalParamsThunk,
    saveLocalParamsThunk,
    setThemeThunk,
    setLanguageThunk,
    setDrawerPositionThunk,
    setConsentStatusThunk,
    setWindowSizeThunk
}

export default localParamsSlice.reducer