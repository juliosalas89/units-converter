import { createSlice } from "@reduxjs/toolkit";

const localParamsSlice = createSlice({
    name: 'localParamas',
    initialState: {
        userPreferences: {
            language: 1,
            theme: null
        },
        screenSize: null,
        safeArea: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    reducers: {
        setLanguage (state, action) {
            return {...state, userPreferences: {...state.userPreferences, language: action.payload }}
        },
        setTheme (state, action) {
            return {...state, userPreferences: {...state.userPreferences, theme: action.payload }}
        },
        setScreenSize (state, action) {
            return {...state, screenSize: action.payload}
        },
        setSafeArea (state, action) {
            return {...state, safeArea: action.payload}
        }

    }
})



// const fetchDeviceInfo = createAsyncThunk('device/fetchDeviceInfo', async () => {
//     // Retrieve device information here (e.g., using a native module or AsyncStorage)
//     const deviceInfo = await useSafeAreaInsets();
//     return deviceInfo;
//   });

export const { setLanguage, setTheme, setScreenSize, setSafeArea,  } = localParamsSlice.actions

export default localParamsSlice.reducer