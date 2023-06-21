import { Pressable, Text, StyleSheet, Platform } from "react-native"
import { colors } from "../Styles"

const CButton = ({styles = {}, pressedColor = colors.main1, callBack, title})=> {

    const st = StyleSheet.create({
        styles: {
            backgroundColor: colors.main2,
            padding: 7,
            borderRadius: 4,
            ...styles
        },
        textStyle: {
            textAlign: styles.textAlign || 'center', 
            color: styles.color || colors.sec2,
            fontSize: styles.fontSize || 20
        }
    })
    
    const buttonStyles = (pressed) => {
        return pressed ? Platform.OS === 'ios' ? { ...st.styles, backgroundColor: pressedColor } : { ...st.styles ,backgroundColor: pressedColor } : st.styles
    }

    return (
        <Pressable
            style={({pressed}) => buttonStyles(pressed)}
            onPress={callBack}
            android_ripple={{ color: pressedColor }}
        >
            <Text style={st.textStyle}>{title}</Text>
        </Pressable>
    )
}

export default CButton