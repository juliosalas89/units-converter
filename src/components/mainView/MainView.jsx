import UnitsResultList from "./UnitsResultsList.jsx"
import ValueInput from "./ValueInput.jsx"
import Header from "./header/Header.jsx"
import Banner from '../ads/Banner.jsx'
import UnitsModal from "./UnitsModal.jsx"
import unitsData from '../../appData/units.json'
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { setTriggerDrawer, setSelectedUnitsIdsThunk } from "../../store/slices/generalData.slice"
import AppRating from "../appRating/AppRating.jsx"

const MainView = ({navigation}) => {
    const [inputValue, setInputValue] = useState(null)
    const [units, setUnits] = useState(unitsData.Distance)
    const [triggerFocus, setTriggerFocus] = useState(false)
    const [selectedUnit, setSelectedUnit] = useState(null)
    const [unitsModalVisible, setUnitsModalVisible] = useState(false)
    const isMounted = useRef(false)

    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize)
    const selectedType = useSelector(store => store.generalData.selectedType)
    const selectedUnitsIds = useSelector(store => store.generalData.selectedUnitsIds)
    const colors = useSelector(state => state.localParams.theme.colors)
    const allFavUnits = useSelector(state => state.generalData.favUnits)

    useEffect(()=> {
        setUnits(unitsData[selectedType])
        setInputValue(null)
    }, [selectedType])
    
    useEffect(()=> {
        const selected = units.find(unit => unit.id === selectedUnitsIds[selectedType])
        setSelectedUnit(selected)
    }, [units])
    
    useEffect(()=> {
        const selected = units.find(unit => unit.id === selectedUnitsIds[selectedType])
        setSelectedUnit(selected)
        isMounted.current && setTimeout(() => setTriggerFocus(!triggerFocus), 200)
        isMounted.current = true
    }, [selectedUnitsIds])
    
    const handleChangeInputValue = input => !isNaN(input) && setInputValue(input.trim())

    const handelUnitSelected = (unitId)=> {
        setUnitsModalVisible(false)
        dispatch(setSelectedUnitsIdsThunk({[selectedType]: unitId }))
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
            backgroundColor: colors.headerBg,
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
                        triggerFocus={triggerFocus}
                        units={units}
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
                {/* <AppRating/> */}
                <Banner/>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButtons} onPress={() => setUnitsModalVisible(true)}>
                    <MaterialCommunityIcons name='format-list-bulleted' size={30} color={colors.headerIcons || '#ffff'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButtons} onPress={()=> setTriggerFocus(!triggerFocus)}>
                    <MaterialCommunityIcons name='keyboard-outline' size={30} color={colors.headerIcons || '#ffff'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButtons} onPress={() => dispatch(setTriggerDrawer())}>
                    <Entypo name='grid' size={30} color={colors.headerIcons || '#ffff'}/>
                </TouchableOpacity>
            </View>
            <UnitsModal units={units} unitsModalVisible={unitsModalVisible} setUnitsModalVisible={setUnitsModalVisible} handelUnitSelected={handelUnitSelected}/>
        </>
    )
}

export default MainView