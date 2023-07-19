import FavStar from "../general/FavStar"
import { Pressable, Text, View, StyleSheet } from "react-native"
import { useState, useEffect, useRef } from "react"
import Decimal from "decimal.js"
import { useSelector, useDispatch } from "react-redux"
import { setSelectedUnitsIds, setFavUnits, saveGeneralDataThunk } from "../../store/slices/generalData.slice"

const Card = ({item, inputValue, favUnits, selectedUnit, selected}) => {
    const unitPressableRef = useRef(null);
    const [result, setResult] = useState(null)
    const [fillStar, setFillStar] = useState(favUnits.includes(item.id))
    
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const selectedType = useSelector(state => state.generalData.selectedType);
    const windowSize = useSelector(state => state.localParams.windowSize)

    useEffect(()=>{
        setResult(null)
    }, [])
    
    useEffect(()=>{
        setFillStar(favUnits.includes(item.id))
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
        dispatch(setSelectedUnitsIds({[selectedType]: item.id }))
    }

    const handleFavStarPress = () => {
        setFillStar(!fillStar)
        setTimeout(()=> {
            const newFavUnits = favUnits.includes(item.id) ? favUnits.filter(favId => favId !== item.id) : [...favUnits, item.id]
            dispatch(setFavUnits(newFavUnits))
            dispatch(saveGeneralDataThunk())
        }, 200)
    }

    const styles = StyleSheet.create({
        unitsLine: {
            borderBottomWidth: 1,
            borderBottomColor: colors.sec1,
            flexDirection: 'row',
            padding: 5,
            backgroundColor: selected ? colors.sec1 : colors.sec2,
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
            width: (windowSize.width / 2) - 40,
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'flex-end'
        },
        unitsText: {
            fontSize: 20,
            color: selected ? colors.sec2 : colors.sec1,
        },
        descriptionText: {
            color: colors.sec1,
            marginBottom: 2
        },
        valuesText: {
            fontSize: 20,
            color: selected ? colors.sec2 : colors.sec1,
            textAlign: 'right'
        }
    })

    return (
        <View style={styles.unitsLine}>
            <View style={styles.valuesBox}>
                <Text style={styles.valuesText}>{result}</Text>
            </View>
            <View style={styles.unitsBox}>
                <Pressable 
                    hitSlop={5}
                    ref={unitPressableRef}
                    onLongPress={() => handleLongPress()} 
                    delayLongPress={200}
                    style={styles.unitsSubBox}
                >
                    <Text style={styles.unitsText}>{`${item.unit} `}</Text>
                    {/* <Text style={styles.descriptionText}>{`- ${item.descriptionEN}`}</Text> */}
                </Pressable>
                <View style={{ paddingTop: 4 }}>
                    <Pressable hitSlop={5} onPress={() => handleFavStarPress()}>
                        <FavStar fill={fillStar ? '#ffe040' : 'none'}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Card

