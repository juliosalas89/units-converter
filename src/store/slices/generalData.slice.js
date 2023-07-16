import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState: {
        drowerVisible: false,
        selectedType: 'length',
        generalDataFetched: false,
        selectedUnitsIndexes: {
            length: 0,
            speed: 0,
            weight: 0,
            pressure: 0,
            volume: 0,
            "work-energy": 0,
            power: 0
        }
    },
    reducers: {
        setDrowerVisible (state, action) {
            return {...state, drowerVisible: action.payload }
        },
        setSelectedType (state, action) {
            return {...state, selectedType: action.payload || state.selectedType }
        },
        setGeneralDataFetched (state, action) {
            return {...state, generalDataFetched: action.payload }
        },
        setSelectedUnitsIndexes (state, action) {
            const payload = action.payload || {}
            return {...state, selectedUnitsIndexes: {...state.selectedUnitsIndexes, ...payload } }
        },
    }
})

const saveGeneralDataThunk = () => {
    return async (dispatch, getState) => {
        try {
            const generalData = getState().generalData
            const jsonPayload = JSON.stringify(generalData)
            await AsyncStorage.setItem('general-data', jsonPayload);
        } catch (error) {
            console.log(error)
        }
    }
}

const getGeneralDataThunk = () => {
    return async (dispatch, getState) => {
        try {
            const value = JSON.parse(await AsyncStorage.getItem('general-data'));
            value && value.selectedUnitsIndexes && dispatch(setSelectedUnitsIndexes(value.selectedUnitsIndexes))
            value && value.selectedType && dispatch(setSelectedType(value.selectedType))
            dispatch(setGeneralDataFetched(true))
        } catch (error) {
            console.log(error)
        }
    }
}

export const { 
    setDrowerVisible,
    setSelectedType,
    setGeneralDataFetched,
    setSelectedUnitsIndexes
} = generalDataSlice.actions

export {
    saveGeneralDataThunk,
    getGeneralDataThunk
}

export default generalDataSlice.reducer