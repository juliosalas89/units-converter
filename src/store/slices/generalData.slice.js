import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState: {
        drowerVisible: false,
        selectedType: 'Distance',
        generalDataFetched: false,
        selectedUnitsIds: {
            Area: '01',
            Distance: '01',
            Speed: '01',
            Weight: '01',
            Pressure: '01',
            Volume: '01',
            "Work-Energy": '01',
            Power: '01'
        },
        favUnits: {
            Area: [],
            Distance: [],
            Speed: [],
            Weight: [],
            Pressure: [],
            Volume: [],
            "Work-Energy": [],
            Power: []
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
        setSelectedUnitsIds (state, action) {
            const payload = action.payload || {}
            return {...state, selectedUnitsIds: { ...state.selectedUnitsIds, ...payload } }
        },
        setAllFavUnits (state, action) {
            const payload = action.payload || {}
            return {...state, favUnits: { ...state.favUnits, ...payload } }
        },
        setFavUnits (state, action) {
            return {...state, favUnits: { ...state.favUnits, [state.selectedType]: action.payload || [] } }
        },
    }
})

const saveGeneralDataThunk = () => {
    return (dispatch, getState) => {
            const generalData = getState().generalData
            const jsonPayload = JSON.stringify(generalData)
            AsyncStorage.setItem('general-data', jsonPayload)
            .catch(err => {
                console.log(err)
            })
    }
}

const getGeneralDataThunk = () => {
    return (dispatch, getState) => {
            AsyncStorage.getItem('general-data')
            .then(result => {
                const value = JSON.parse(result)
                value && value.selectedUnitsIds && dispatch(setSelectedUnitsIds(value.selectedUnitsIds))
                value && value.selectedType && dispatch(setSelectedType(value.selectedType))
                value && value.favUnits && dispatch(setAllFavUnits(value.favUnits))
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                dispatch(setGeneralDataFetched(true))
            })
    }
}

export const { 
    setDrowerVisible,
    setSelectedType,
    setGeneralDataFetched,
    setSelectedUnitsIds,
    setAllFavUnits,
    setFavUnits
} = generalDataSlice.actions

export {
    saveGeneralDataThunk,
    getGeneralDataThunk
}

export default generalDataSlice.reducer