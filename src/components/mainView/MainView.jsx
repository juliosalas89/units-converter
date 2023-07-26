import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native"
import UnitsResultList from "./UnitsResultsList.jsx"
import ValueInput from "./ValueInput.jsx"
import Header from "./header/Header.jsx"
import Banner from '../ads/Banner.jsx'
import { useSelector } from "react-redux"
import { MaterialCommunityIcons, Octicons, Entypo, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import unitsData from '../../appData/units.json'
import { setDrowerVisible } from "../../store/slices/generalData.slice"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import typesData from '../../appData/types.json'

const MainView = ({navigation}) => {
    const [inputValue, setInputValue] = useState(null)
    const [focusInputFlag, setFocusInputFlag] = useState(false)
    const [units, setUnits] = useState(unitsData.Distance)
    const [selectedUnit, setSelectedUnit] = useState(null)
    const [selectedTypeData, setSelectedTypeData] = useState(null)

    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize)
    const selectedType = useSelector(store => store.generalData.selectedType)
    const selectedUnitsIds = useSelector(store => store.generalData.selectedUnitsIds)
    const colors = useSelector(state => state.localParams.theme.colors)
    const allFavUnits = useSelector(state => state.generalData.favUnits)

    useEffect(()=> {
        setUnits(unitsData[selectedType])
        setInputValue(null)
        setSelectedTypeData(typesData.types.find(type => type.name === selectedType))
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
        },
        typeTitleContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        typeTitle: {
            color: colors.main1,
            fontSize: 20,
            paddingTop: 9,
            paddingRight: 23
        },
        typeTitleIconContainer: {
            paddingTop: 9,
            marginRight: 10
        },
    })

    return !selectedUnit ? null : (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
            <View style={styles.container}>
                <Header/>
                <View style={styles.typeTitleContainer}>
                    <View style={styles.typeTitleIconContainer}>
                        {selectedTypeData.group === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={selectedTypeData.icon} size={25} color={colors.main1}/> : null}
                        {selectedTypeData.group === 'MaterialIcons' ? <MaterialIcons name={selectedTypeData.icon} size={25} color={colors.main1}/> : null}
                        {selectedTypeData.group === 'Ionicons' ? <Ionicons name={selectedTypeData.icon} size={25} color={colors.main1}/> : null}
                        {selectedTypeData.group === 'SimpleLineIcons' ? <SimpleLineIcons name={selectedTypeData.icon} size={25} color={colors.main1}/> : null}
                    </View>
                    <Text style={styles.typeTitle}>{selectedType}</Text>
                </View>
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
        </KeyboardAvoidingView>
    )
}

export default MainView