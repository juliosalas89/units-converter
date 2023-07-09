import { FlatList } from "react-native"
import Card from "./Card";
  
  const UnitsResultList = ({inputValue, selectedUnit, units}) => {

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
