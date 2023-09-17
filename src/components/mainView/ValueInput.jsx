import CButton from "../general/CButton.jsx"
import { TextInput, View, StyleSheet } from "react-native"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"

const ValueInput = ({ inputValue, triggerFocus, setUnitsModalVisible, handleChangeInputValue, selectedUnit }) => {
    const inputRef = useRef(null);
    const isMounted = useRef(false)
    
    const colors = useSelector(state => state.localParams.theme.colors);
    const cardFontWeight = useSelector(state => state.localParams.theme.cardFontWeight);
    const cardLinesWidth = useSelector(state => state.localParams.theme.cardLinesWidth);
    
    useEffect(()=> {
        isMounted.current && focusInput()
        isMounted.current = true
    }, [triggerFocus])
    
    const focusInput = ()=> {
        inputRef.current && inputRef.current.blur()
        inputRef.current && inputRef.current.focus()
    }

    const styles = StyleSheet.create({
        modalBg: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)'
        },
        container: {
            width: '100%',
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingLeft: 18, 
            paddingRight: 18,
            paddingTop: 7, 
            paddingBottom: 7
        },
        measureInput: {
            width: '49%',
            padding: 7,
            color: colors.inputText,
            fontSize: 20,
            borderWidth: cardLinesWidth || 0.5,
            fontWeight: cardFontWeight ? cardFontWeight.toString() : 'normal',
            borderColor: colors.inputBorder,
            borderRadius: 3, 
            textAlign: 'right'
        },
    })

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={styles.measureInput}
                inputMode='numeric'
                keyboardType='numeric'
                onChangeText={handleChangeInputValue}
                value={inputValue}
            />
            <CButton 
                styles={{
                    width: '49%',
                    color: colors.unitButtonText,
                    backgroundColor: colors.unitButton,
                    textAlign: 'left',
                    fontWeight: cardFontWeight
                }} 
                title={selectedUnit.unit} 
                onPress={()=> setUnitsModalVisible(true)}
            />
        </View>
    )
}

export default ValueInput