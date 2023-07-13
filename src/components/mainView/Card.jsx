import FavStar from "../general/FavStar"
import { Pressable, Text, View, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import Decimal from "decimal.js"
import { useSelector } from "react-redux"

const Card = ({item, inputValue, selectedUnit}) => {
    const [result, setResult] = useState(null)

    const colors = useSelector(state => state.localParams.userPreferences.theme.colors);

    useEffect(()=>{
        setResult(null)
    }, [selectedUnit])
    
    useEffect(()=>{
        calculateResult()
    }, [inputValue, selectedUnit])

    const calculateResult = () => {
        if(!inputValue || !selectedUnit) return setResult(null)

        const newResult =  new Decimal(inputValue.toString()).times(selectedUnit.factor.toString()).dividedBy(item.factor.toString())

        //Too big or too small numbers need exponential notation
        const expCondition = newResult.greaterThan(new Decimal('9999999999')) || newResult.lessThan(new Decimal('0.000000001'))

        //Long numbers (with several decimal positions) need to be trimmed
        const decimals = newResult.decimalPlaces()
        const integers = newResult.toFixed(0).toString().length

        const parsedResult = expCondition ? newResult.toExponential(4) : 
            integers > 2 && decimals > 2 ? newResult.toFixed(2) : 
            integers === 2 && decimals > 4 ? newResult.toFixed(4) : 
            integers === 1 && decimals > 9 ? newResult.toFixed(9) : Number(newResult.toString())
        setResult(parsedResult)
    }

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

    return (
        <View style={styles.unitsLine}>
            <View style={styles.valuesBox}>
                <Text style={styles.valuesText}>{result}</Text>
            </View>
            <View style={styles.unitsBox}>
                <View style={styles.unitsSubBox}>
                    <Text style={styles.unitsText}>{`${item.unit} `}</Text>
                    {/* <Text style={styles.descriptionText}>{`- ${item.descriptionEN}`}</Text> */}
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

