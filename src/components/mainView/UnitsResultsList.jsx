import { FlatList, StyleSheet } from "react-native"
import Card from "./Card";
import unitsData from '../../appData/units.json'
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
  
  const UnitsResultList = ({inputValue}) => {
    const [units, setUnits] = useState(unitsData.length)
    const [selectedUnit, setSelectedUnit] = useState(null)
    const selectedUnitsIndexes = useSelector(state => state.generalData.selectedUnitsIndexes)
    const selectedType = useSelector(state => state.generalData.selectedType)

    useEffect(()=> {
        setUnits(unitsData[selectedType])
    }, [selectedType])

    useEffect(()=> {
        setSelectedUnit(units[selectedUnitsIndexes[selectedType]])
    }, [selectedUnitsIndexes, selectedType])


    return (
        <FlatList
            data={units}
            keyExtractor={(item, index) => item.unit + index}
            renderItem={({ item }) => (
                <Card item={item} inputValue={inputValue} selectedUnit={selectedUnit}></Card>
              )}
        >
        </FlatList>
    )
}

export default UnitsResultList
