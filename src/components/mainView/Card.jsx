import FavStar from "../general/FavStar"
import Decimal from "decimal.js"
import { Pressable, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setSelectedUnitsIdsThunk } from "../../store/slices/generalData.slice"

const Card = ({item, inputValue, favUnits, selectedUnit, copyToClipboard, selected, handleSaveFavs}) => {
    const unitPressableRef = useRef(null);
    const [result, setResult] = useState(null)
    const [fillStar, setFillStar] = useState(false)
    
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const selectedType = useSelector(state => state.generalData.selectedType);
    const windowSize = useSelector(state => state.localParams.windowSize)

    useEffect(()=>{
        setResult(null)
    }, [])
    
    useEffect(()=>{
        favUnits && item && setFillStar(favUnits.includes(item.id))
    }, [favUnits, item])
    
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

    const handleLongPress = ()=> {
        dispatch(setSelectedUnitsIdsThunk({[selectedType]: item.id }))
    }

    const handleFavStarPress = () => {
        setFillStar(!fillStar)
        handleSaveFavs(item.id)
    }

    const styles = StyleSheet.create({
        unitsLine: {
            borderBottomWidth: 1,
            borderBottomColor: colors.cardLine,
            flexDirection: 'row',
            padding: 5,
            backgroundColor: selected ? colors.cardBgSelected : colors.cardBg,
        },
        valuesBox: {
            paddingRight: 5,
            borderRightWidth: 1,
            borderRightColor: colors.cardLine,
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
            width: (windowSize.width / 2) - 40,
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'flex-end'
        },
        unitsText: {
            fontSize: 20,
            color: selected ? colors.cardTextSelected : colors.cardText,
        },
        valuesText: {
            fontSize: 20,
            color: selected ? colors.cardTextSelected : colors.cardText,
            textAlign: 'right'
        }
    })

    return (
        <View style={styles.unitsLine}>
            <TouchableOpacity 
                onPress={() => result && copyToClipboard(result)} 
                style={styles.valuesBox}
            >
                <Text style={styles.valuesText}>{result}</Text>
            </TouchableOpacity>
            <View style={styles.unitsBox}>
                <Pressable 
                    hitSlop={5}
                    ref={unitPressableRef}
                    onLongPress={() => handleLongPress()} 
                    delayLongPress={200}
                    android_ripple={{ color: colors.cardBgSelected }}
                    style={styles.unitsSubBox}
                >
                    <Text style={styles.unitsText}>{`${item.unit} `}</Text>
                </Pressable>
                <View style={{ paddingTop: 4 }}>
                    <Pressable hitSlop={10} onPress={() => handleFavStarPress()}>
                        <FavStar fill={fillStar ? colors.favStarFill : 'none'} stroke={colors.favStarStroke}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Card

