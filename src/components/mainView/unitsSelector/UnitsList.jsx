import { FlatList, View, Text } from "react-native"

const UnitsList = () => {
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
        <View>
            <FlatList
                data={unitsData}
                renderItem={({item}) => <Text>{item.unit}</Text>}
                keyExtractor={ item => item.unit + item.value }
            >
            </FlatList>
        </View>
    )
}

export default UnitsList