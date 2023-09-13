import { Pressable, Text, StyleSheet, Platform } from "react-native"
import { useSelector } from "react-redux";

const CButton = ({styles = {}, pressedColor, onPress, title })=> {
    const colors = useSelector(state => state.localParams.theme.colors);

    const st = StyleSheet.create({
        styles: {
            backgroundColor: colors.confirmButton,
            padding: 7,
            borderRadius: 4,
            ...styles
        },
        textStyle: {
            textAlign: styles.textAlign || 'center', 
            color: styles.color || colors.cancelButtonText,
            fontSize: styles.fontSize || 20
        }
    })
    
    const buttonStyles = (pressed) => {
        return pressed && Platform.OS === 'ios' ? { ...st.styles, backgroundColor: pressedColor || colors.headerBg } : st.styles
    }

    return (
        <Pressable
            style={({pressed}) => buttonStyles(pressed)}
            onPress={onPress}
            android_ripple={{ color: pressedColor || colors.headerBg }}
        >
            <Text style={st.textStyle}>{title}</Text>
        </Pressable>
    )
}

export default CButton