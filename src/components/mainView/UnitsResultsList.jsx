import { FlatList } from "react-native"
import Card from "./Card";
  
  const UnitsResultList = ({inputValue, selectedIndex, selectedUnit, units}) => {
    return (
        <FlatList
            data={units}
            keyExtractor={(item, index) => item.unit + index}
            renderItem={({ item, index }) => (
                <Card item={item} inputValue={inputValue} index={index} selected={index === selectedIndex} selectedUnit={selectedUnit}></Card>
              )}
        >
        </FlatList>
    )
}

export default UnitsResultList
