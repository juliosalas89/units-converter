import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localParamsSlice = createSlice({
    name: 'localParamas',
    initialState: {
        language: 0,
        theme: {
            colors: {
                main1: '#394a51',
                main2: '#7fa99b',
                sec1: '#fdc57b',
                sec2: '#fbf2d5'
            },
            fontName: 'Notes-Alarm'
        },
        drowerPsition: 'right',
        prefFetched: false,
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
        setDrowerPosition (state, action) {
            return {...state, drowerPsition: action.payload}
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

const getUserPreferencesThunk = () => {
    return async (dispatch, getState) => {
        try {
            const language = JSON.parse(await AsyncStorage.getItem('user-preferences-language'));
            const theme = JSON.parse(await AsyncStorage.getItem('user-preferences-theme'));
            (language || language === 0) && dispatch(setLanguage(language))
            theme && dispatch(setTheme(theme))
            dispatch(setPrefFetched(true))
        } catch (error) {
            console.log(error)
        }
    }
}


export const { 
    setLanguage, 
    setTheme, 
    setPrefFetched, 
    setWindowSize, 
    setSafeArea 
} = localParamsSlice.actions

export { 
    saveThemeThunk,
    setAndSaveLanguageThunk,
    getUserPreferencesThunk 
}

export default localParamsSlice.reducer