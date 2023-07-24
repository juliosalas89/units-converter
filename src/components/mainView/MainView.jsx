import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import UnitsResultList from "./UnitsResultsList.jsx"
import ValueInput from "./ValueInput.jsx"
import Header from "./header/Header.jsx"
import Banner from '../ads/Banner.jsx'
import { useSelector } from "react-redux"
import { MaterialCommunityIcons, Octicons, Entypo } from '@expo/vector-icons'
import unitsData from '../../appData/units.json'
import { setDrowerVisible } from "../../store/slices/generalData.slice"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"

const MainView = ({navigation}) => {
    const [inputValue, setInputValue] = useState(null)
    const [focusInputFlag, setFocusInputFlag] = useState(false)
    const [units, setUnits] = useState(unitsData.length)
    const [selectedUnit, setSelectedUnit] = useState(null)

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
    }, [selectedUnitsIds, selectedType, units])
    
    const handleChangeInputValue = input => {
        !isNaN(input) && setInputValue(input.trim())
    }

    const styles = StyleSheet.create({
        container: {
            height: windowSize.height - 120
        },
        footer: {
            backgroundColor: colors.main1,
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
        <View style={{ height: '100%', backgroundColor: 'inherit'}}>
            <View style={styles.container}>
                <Header/>
                <ValueInput 
                    selectedUnit={selectedUnit} 
                    navigation={navigation} 
                    units={units} 
                    focusInputFlag={focusInputFlag} 
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
            <Banner/>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButtons}>
                    <Octicons name='arrow-switch' size={30} color='#ffff'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButtons} onPress={()=> setFocusInputFlag(!focusInputFlag)}>
                    <MaterialCommunityIcons name='keyboard-outline' size={30} color='#ffff'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButtons} onPress={() => dispatch(setDrowerVisible(true))}>
                    <Entypo name='grid' size={30} color='#ffff'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainView