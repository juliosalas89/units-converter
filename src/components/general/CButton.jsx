import { Pressable, Text, StyleSheet, Platform } from "react-native"
import { useSelector } from "react-redux";

const CButton = ({styles = {}, pressedColor, onPress, title })=> {
    const colors = useSelector(state => state.localParams.theme.colors);

    const st = StyleSheet.create({
        styles: {
            backgroundColor: colors.prim2,
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
        return pressed && Platform.OS === 'ios' ? { ...st.styles, backgroundColor: pressedColor || colors.prim1 } : st.styles
    }

    return (
        <Pressable
            style={({pressed}) => buttonStyles(pressed)}
            onPress={onPress}
            android_ripple={{ color: pressedColor || colors.prim1 }}
        >
            <Text style={st.textStyle}>{title}</Text>
        </Pressable>
    )
}

export default CButton