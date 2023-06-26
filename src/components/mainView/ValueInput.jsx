import { TextInput, View, StyleSheet, BackHandler } from "react-native"
import st, { colors } from '../Styles.js'
import CButton from "../general/CButton.jsx"
import { useEffect } from "react"
import { useRef } from "react"

const ValueInput = ({navigation, focusInputFlag}) => {
    const inputRef = useRef(null);

    useEffect(()=> {
        inputRef.current.focus()
    }, [focusInputFlag])

    return (
        <View style={st.container}>
            <TextInput
                ref={inputRef}
                style={styles.valueInput}
                inputMode='numeric'
                keyboardType='numeric'
            />
            <CButton styles={{
                width: '49%',
                color: colors.sec2,
                backgroundColor: colors.main2,
                textAlign: 'left'
            }} title='mm' callBack={()=> navigation.navigate('ModeSelector')}></CButton>
        </View>
    )
}

export default ValueInput

const styles = StyleSheet.create({
    valueInput: {
        width: '49%',
        padding: 7,
        color: colors.main1,
        fontSize: 20,
        borderWidth: 1,
        borderColor: colors.main2,
        borderRadius: 3, 
        textAlign: 'right'
    },
    unitsButton: {
        width: '49%',
        color: colors.sec2,
        backgroundColor: colors.main2,
        textAlign: 'start'
    }
})