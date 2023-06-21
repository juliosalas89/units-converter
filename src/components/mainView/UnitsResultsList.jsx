import { FlatList, StyleSheet } from "react-native"
import Card from "./Card";
  
  const UnitsResultList = () => {
    const unitsData = [
        { unit: 'mm', value:'0.5' },
        { unit: 'cm', value:'12' },
        { unit: 'in', value:'25' },
        { unit: 'foot', value:'24' },
        { unit: 'league', value:'56' },
        { unit: 'mm', value:'105' },
        { unit: 'mm', value:'115' },
        { unit: 'mm', value:'456' },
        { unit: 'mm', value:'456' },
        { unit: 'mm', value:'456' },
        { unit: 'mm', value:'456' },
        { unit: 'mm', value:'456' },
        { unit: 'mm', value:'456' }
      ];
    return (
        <>
            <FlatList
                data={unitsData}
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
