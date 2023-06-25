import { View, StyleSheet, Text } from "react-native"

const ModeSelector = () => {
    return (
        <View style={styles.container}>
            <Text>Mode Selector</Text>
        </View>
    )
}

export default ModeSelector

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})