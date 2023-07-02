import { createSlice } from "@reduxjs/toolkit";
import unitsData from '../../appData/units.json'

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState: {
        drowerVisible: false,
        selectedType: 'length',
        selectedUnitsIndexes: {
            length: 0
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
            return {...state, selectedUnitIndexes: action.payload }
        },
    }
})



export const { 
    setDrowerVisible,
    setSelectedType,
    setSelectedUnitsIndexes
} = generalDataSlice.actions

export default generalDataSlice.reducer