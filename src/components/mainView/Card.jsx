import { Pressable, Text, View, StyleSheet } from "react-native"
import FavStar from "../general/FavStar"
import { colors } from "../Styles"

const Card = ({item}) => {
    return (
        <View style={styles.unitsLine}>
            <View style={styles.valuesBox}>
                <Text style={styles.valuesText}>{item.value}</Text>
            </View>
            <View style={styles.unitsBox}>
                <Text style={styles.unitsText}>{item.unit}</Text>
                <View style={{ paddingTop: 4 }}>
                    <Pressable>
                        <FavStar/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    unitsLine: {
        borderBottomWidth: 1,
        borderBottomColor: colors.sec1,
        flexDirection: 'row',
        padding: 5,
    },
    valuesBox: {
        paddingRight: 5,
        borderRightWidth: 1,
        borderRightColor: colors.sec1,
        flex: 0.5,
    },
    unitsBox: {
        paddingRight: 7,
        paddingLeft: 5,
        flexDirection: 'row',
        justifyContent: "space-between",
        flex: 0.5,
    },
    unitsText: {
        fontSize: 20,
        color: colors.sec1,
    },
    valuesText: {
        fontSize: 20,
        color: colors.sec1,
        textAlign: 'right'
    }
})