import CButton from "../general/CButton.jsx"
import { TextInput, View, StyleSheet } from "react-native"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"

const ValueInput = ({ triggerFocusInput, triggerLocked, unlockTrigger, inputValue, setUnitsModalVisible, handleChangeInputValue, selectedUnit }) => {
    const inputRef = useRef(null);
    const isMounted = useRef(false)
    
    const colors = useSelector(state => state.localParams.theme.colors);
    
    useEffect(()=> {
        isMounted.current ? focusInput() : isMounted.current = true
    }, [triggerFocusInput])

    useEffect(()=> {
        !triggerLocked ? setTimeout(() => focusInput(), 200) : unlockTrigger()
    }, [selectedUnit])
    
    const focusInput = ()=> {
        inputRef.current && inputRef.current.blur()
        inputRef.current && inputRef.current.focus()
    }

    const styles = StyleSheet.create({
        modalBackground: {
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
            color: colors.prim1,
            fontSize: 20,
            borderWidth: 1,
            borderColor: colors.prim2,
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
                    color: colors.sec2,
                    backgroundColor: colors.prim2,
                    textAlign: 'left'
                }} 
                title={selectedUnit.unit} 
                onPress={()=> setUnitsModalVisible(true)}
            />
        </View>
    )
}

export default ValueInput