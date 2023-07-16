import { View, StyleSheet, TouchableOpacity } from "react-native"
import UnitsResultList from "./UnitsResultsList"
import ValueInput from "./ValueInput"
import Header from "./header/Header"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons, Octicons, Entypo } from '@expo/vector-icons'
import unitsData from '../../appData/units.json'
import { useDispatch } from "react-redux"
import { setDrowerVisible } from "../../store/slices/generalData.slice"
import { useState, useEffect } from "react"

const MainView = ({navigation}) => {
    const [inputValue, setInputValue] = useState(null)
    const [focusInputFlag, setFocusInputFlag] = useState(false)
    const [units, setUnits] = useState(unitsData.length)
    const [selectedUnit, setSelectedUnit] = useState(null)
    
    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize);
    const selectedType = useSelector(store => store.generalData.selectedType)
    const selectedUnitsIndexes = useSelector(store => store.generalData.selectedUnitsIndexes)
    const colors = useSelector(state => state.localParams.theme.colors);

    useEffect(()=> {
        setUnits(unitsData[selectedType])
        setInputValue(null)
    }, [selectedType])

    useEffect(()=> {
        setSelectedUnit(units[selectedUnitsIndexes[selectedType]])
    }, [selectedUnitsIndexes, selectedType, units])
    
    const handleChangeInputValue = input => !isNaN(input) && setInputValue(input)

    const styles = StyleSheet.create({
        container: {
            height: windowSize.height - 50
        },
        footer: {
            backgroundColor: colors.main1,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        footerButtons: {
            height: '100%',
            width: 70,
            textAlign: 'center',
            padding: 10
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
                    selectedUnit={selectedUnit} 
                    units={units} 
                    inputValue={inputValue}
                />
            </View>
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