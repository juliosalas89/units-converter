import { Pressable, Text, StyleSheet, Platform } from "react-native"
import { useSelector } from "react-redux";

const CButton = ({styles = {}, pressedColor, callBack, title })=> {
    const colors = useSelector(state => state.localParams.userPreferences.theme.colors);

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
        return pressed && Platform.OS === 'ios' ? { ...st.styles, backgroundColor: pressedColor || colors.main1 } : st.styles
    }

    return (
        <Pressable
            style={({pressed}) => buttonStyles(pressed)}
            onPress={callBack}
            android_ripple={{ color: pressedColor || colors.main1 }}
        >
            <Text style={st.textStyle}>{title}</Text>
        </Pressable>
    )
}

export default CButton