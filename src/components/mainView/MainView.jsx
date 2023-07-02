import { View, StyleSheet, TouchableOpacity } from "react-native"
import UnitsResultList from "./UnitsResultsList"
import ValueInput from "./ValueInput"
import Header from "./Header"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { colors } from "../Styles"
import { useDispatch } from "react-redux"
import { setDrowerVisible } from "../../store/slices/generalData.slice"
import { useState, useEffect } from "react"

const MainView = ({navigation}) => {
    const [inputValue, setInputValue] = useState(null)
    const [focusInputFlag, setFocusInputFlag] = useState(false)
    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize);
    const selectedType = useSelector(store => store.generalData.selectedType)
    const selectedUnit = useSelector(store => store.generalData.selectedUnit)


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
        }
    })

    return (
        <View style={{ height: '100%', backgroundColor: 'inherit'}}>
            <View style={styles.container}>
                <Header/>
                <ValueInput navigation={navigation} focusInputFlag={focusInputFlag} inputValue={inputValue} setInputValue={setInputValue}></ValueInput>
                <UnitsResultList inputValue={inputValue}/>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => dispatch(setDrowerVisible(true))}>
                    <Octicons name='arrow-switch' size={30} color='#ffff'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setFocusInputFlag(!focusInputFlag)}>
                    <MaterialCommunityIcons name='keyboard-outline' size={30} color='#ffff'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainView