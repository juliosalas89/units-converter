import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localParamsSlice = createSlice({
    name: 'localParamas',
    initialState: {
        userPreferences: {
            language: 0,
            theme: {
                colors: {
                    main1: '#394a51',
                    main2: '#7fa99b',
                    sec1: '#fdc57b',
                    sec2: '#fbf2d5'
                },
                fontName: 'Notes-Alarm'
            }
        },
        prefFetched: false,
        windowSize: null,
        safeArea: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    reducers: {
        setUserPreferences (state, action) {
            const language = action.payload && (action.payload.language || action.payload.language === 0) ? action.payload.language : state.userPreferences.language
            const theme = action.payload && action.payload.theme ? action.payload.theme : state.userPreferences.theme
            return {...state, userPreferences: { language, theme } }
        },
        setLanguage (state, action) {
            const language = action.payload || state.userPreferences.language
            return {...state, userPreferences: {...state.userPreferences, language } }
        },
        setTheme (state, action) {
            const theme = action.payload || state.userPreferences.theme
            return {...state, userPreferences: {...state.userPreferences, theme }}
        },
        setPrefFetched (state, action) {
            return {...state, prefFetched: action.payload }
        },
        setWindowSize (state, action) {
            return {...state, windowSize: action.payload}
        },
        setSafeArea (state, action) {
            return {...state, safeArea: action.payload}
        }

    }
})

const saveUserPreferencesThunk = userPreferences => {
    return async (dispatch, getState) => {
        try {
            const jsonPayload = JSON.stringify(userPreferences)
            await AsyncStorage.setItem('user-preferences', jsonPayload);
            dispatch(setUserPreferences(userPreferences))
        } catch (error) {
            dispatch(setUserPreferences(userPreferences))
            console.log(error)
        }
    }
}

const getUserPreferencesThunk = () => {
    return async (dispatch, getState) => {
        try {
            const userPreferences = getState().localParams.userPreferences
            const value = JSON.parse(await AsyncStorage.getItem('user-preferences'));
            value && dispatch(setUserPreferences({ language: value.language || userPreferences.language, theme: value.theme || userPreferences.theme }))
            dispatch(setPrefFetched(true))
        } catch (error) {
            console.log(error)
        }
    }
}


export const { 
    setUserPreferences, 
    setLanguage, 
    setTheme, 
    setPrefFetched, 
    setWindowSize, 
    setSafeArea 
} = localParamsSlice.actions

export { 
    saveUserPreferencesThunk, 
    getUserPreferencesThunk 
}

export default localParamsSlice.reducer