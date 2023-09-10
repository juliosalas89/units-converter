import UnitsResultList from "./UnitsResultsList.jsx"
import ValueInput from "./ValueInput.jsx"
import Header from "./header/Header.jsx"
import Banner from '../ads/Banner.jsx'
import UnitsModal from "./UnitsModal.jsx"
import unitsData from '../../appData/units.json'
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { setDrowerVisible, saveGeneralDataThunk, setSelectedUnitsIds } from "../../store/slices/generalData.slice"

const MainView = ({navigation}) => {
    const [inputValue, setInputValue] = useState(null)
    const [triggerFocusInput, setTriggerFocusInput] = useState(false)
    const [triggerLocked, setTriggerLocked] = useState(false)
    const [units, setUnits] = useState(unitsData.Distance)
    const [selectedUnit, setSelectedUnit] = useState(null)
    const [unitsModalVisible, setUnitsModalVisible] = useState(false)

    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize)
    const selectedType = useSelector(store => store.generalData.selectedType)
    const selectedUnitsIds = useSelector(store => store.generalData.selectedUnitsIds)
    const colors = useSelector(state => state.localParams.theme.colors)
    const allFavUnits = useSelector(state => state.generalData.favUnits)

    useEffect(()=> {
        setUnits(unitsData[selectedType])
        setInputValue(null)
        setTriggerLocked(true)
    }, [selectedType])

    useEffect(()=> {
        const selected = units.find(unit => unit.id === selectedUnitsIds[selectedType])
        setSelectedUnit(selected)
    }, [selectedUnitsIds, units])
    
    const handleChangeInputValue = input => !isNaN(input) && setInputValue(input.trim())

    const handelUnitSelected = (unitId)=> {
        setUnitsModalVisible(false)
        dispatch(setSelectedUnitsIds({[selectedType]: unitId }))
        dispatch(saveGeneralDataThunk())
    }

    const styles = StyleSheet.create({
        keyboardAvoid: {
            flex: 1,
            maxHeight: windowSize.height - 60
        },
        container: {
            flex: 1
        },
        footer: {
            backgroundColor: colors.prim1,
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        footerButtons: {
            height: '100%',
            width: 60,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        }
    })

    return !selectedUnit ? null : (
        <>
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    <Header/>
                    <ValueInput
                        setUnitsModalVisible={setUnitsModalVisible} 
                        selectedUnit={selectedUnit} 
                        navigation={navigation} 
                        units={units} 
                        triggerFocusInput={triggerFocusInput}
                        triggerLocked={triggerLocked}
                        unlockTrigger={() => setTriggerLocked(false)}
                        inputValue={inputValue} 
                        handleChangeInputValue={handleChangeInputValue}
                        selectedType={selectedType}
                    />
                    <UnitsResultList 
                        favUnits={allFavUnits[selectedType]}
                        selectedId={selectedUnitsIds[selectedType]}
                        selectedUnit={selectedUnit}
                        units={units}
                        inputValue={inputValue}
                    />
                </View>
                {/* <Banner/> */}
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButtons} onPress={() => setUnitsModalVisible(true)}>
                    <MaterialCommunityIcons name='format-list-bulleted' size={30} color='#ffff'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButtons} onPress={()=> setTriggerFocusInput(!triggerFocusInput)}>
                    <MaterialCommunityIcons name='keyboard-outline' size={30} color='#ffff'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButtons} onPress={() => dispatch(setDrowerVisible(true))}>
                    <Entypo name='grid' size={30} color='#ffff'/>
                </TouchableOpacity>
            </View>
            <UnitsModal units={units} unitsModalVisible={unitsModalVisible} setUnitsModalVisible={setUnitsModalVisible} handelUnitSelected={handelUnitSelected}/>
        </>
    )
}

export default MainView