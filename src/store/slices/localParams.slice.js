import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localParamsSlice = createSlice({
    name: 'localParamas',
    initialState: {
        userPreferences: {
            language: 1,
            theme: null
        },
        prefFetched: false,
        windowSize: null,
        safeArea: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    reducers: {
        setUserPreferences (state, action) {
            return {...state, userPreferences: action.payload }
        },
        setLanguage (state, action) {
            return {...state, userPreferences: {...state.userPreferences, language: action.payload }}
        },
        setTheme (state, action) {
            return {...state, userPreferences: {...state.userPreferences, theme: action.payload }}
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
            const value = await AsyncStorage.getItem('user-preferences');
            value && dispatch(setUserPreferences(JSON.parse(value)))
            dispatch(setPrefFetched(true))
        } catch (error) {
            console.log(error)
        }
    }
}

// const fetchDeviceInfo = createAsyncThunk('device/fetchDeviceInfo', async () => {
//     // Retrieve device information here (e.g., using a native module or AsyncStorage)
//     const deviceInfo = await useSafeAreaInsets();
//     return deviceInfo;
//   });


export const { 
    setUserPreferences, 
    setLanguage, 
    setTheme, 
    setPrefFetched, 
    setWindowSize, 
    setSafeArea 
} = localParamsSlice.actions

export { saveUserPreferencesThunk, getUserPreferencesThunk }

export default localParamsSlice.reducer