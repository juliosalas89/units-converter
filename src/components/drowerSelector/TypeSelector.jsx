import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import {MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import { colors } from "../Styles"
import { useSelector } from "react-redux"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import langData from '../../appData/traduction.json'
import { setDrowerVisible, setSelectedType } from "../../store/slices/generalData.slice";
import typesData from '../../appData/types.json'
import { useDispatch } from "react-redux";

const ModeOption = ({option}) => {
    const dispatch = useDispatch()

    const handlePress = (typeName) => {
        dispatch(setSelectedType(typeName))
        dispatch(setDrowerVisible(false))
    }

    const modeStyles = StyleSheet.create({
        modeOption: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        modeContainer: {
            width: '50%',
            height: 90,
        }
    })

    return (
        <View style={modeStyles.modeContainer}>
            <TouchableOpacity 
                style={modeStyles.modeOption}
                onPress={()=> handlePress(option.name)}
            >
                {option.group === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'MaterialIcons' ? <MaterialIcons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'Ionicons' ? <Ionicons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'SimpleLineIcons' ? <SimpleLineIcons name={option.icon} size={50} color={colors.main1}/> : null}
                <Text>{option.name}</Text>
                {/* <Text>{langData.phrases[option.name][userPreferences.language]}</Text> */}
            </TouchableOpacity>
        </View>
    )
}

const TypeSelector = () => {
    const windowSize = useSelector(state => state.localParams.windowSize)
    const userPreferences = useSelector(state => state.localParams.userPreferences)
    const insets = useSafeAreaInsets()

    const styles = StyleSheet.create({
        container: {
            padding: 15,
            paddingTop: insets.top + 30,
            height: windowSize.height,
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    })

    return (
        <View style={styles.container}>
            {typesData.types.map(option => <ModeOption option={option} key={option.id}/>)}
        </View>
    )
}

// {
//     "id": "006",
//     "icon": "ios-alarm-outline",
//     "name": "time",
//     "group": "Ionicons"
// },
// {
//     "id": "009",
//     "icon": "screw-machine-round-top",
//     "name": "bolts",
//     "group": "MaterialCommunityIcons"
// }

export default TypeSelector