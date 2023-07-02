import FavStar from "../general/FavStar"
import { Pressable, Text, View, StyleSheet } from "react-native"
import { colors } from "../Styles"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Card = ({item, inputValue, selectedUnit}) => {
    const [result, setResult] = useState(null)

    useEffect(()=>{
        setResult(selectedUnit ? inputValue * selectedUnit.factor / item.factor : null)
    }, [inputValue])

    useEffect(()=>{
        setResult(null)
    }, [selectedUnit])

    return (
        <View style={styles.unitsLine}>
            <View style={styles.valuesBox}>
                <Text style={styles.valuesText}>{result}</Text>
            </View>
            <View style={styles.unitsBox}>
                <View style={styles.unitsSubBox}>
                    <Text style={styles.unitsText}>{`${item.unit} `}</Text><Text style={styles.descriptionText}>{`- ${item.descriptionEN}`}</Text>
                </View>
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
    unitsSubBox: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-end'
    },
    unitsText: {
        fontSize: 20,
        color: colors.sec1,
    },
    descriptionText: {
        color: colors.sec1,
        marginBottom: 2
    },
    valuesText: {
        fontSize: 20,
        color: colors.sec1,
        textAlign: 'right'
    }
})