import { createSlice } from "@reduxjs/toolkit";
import unitsData from '../../appData/units.json'

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState: {
        drowerVisible: false,
        selectedType: 'length',
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
            return {...state, selectedType: action.payload }
        },
        setSelectedUnitsIndexes (state, action) {
            return {...state, selectedUnitsIndexes: {...state.selectedUnitsIndexes, ...action.payload } }
        },
    }
})



export const { 
    setDrowerVisible,
    setSelectedType,
    setSelectedUnitsIndexes
} = generalDataSlice.actions

export default generalDataSlice.reducer