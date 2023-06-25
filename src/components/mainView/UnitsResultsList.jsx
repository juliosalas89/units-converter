import { FlatList, StyleSheet } from "react-native"
import Card from "./Card";
import unitsData from '../../appData/units.json'
import { useState } from "react";
  
  const UnitsResultList = () => {
    const [units, setUnits] = useState(unitsData.units)
    
    return (
        <>
            <FlatList
                data={units}
                keyExtractor={(item, index) => item.unit + index}
                renderItem={({item}) => (
                    <Card item={item}></Card>
                  )}
            >
            </FlatList>

        </>
    )
}

export default UnitsResultList
