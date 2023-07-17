import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import {MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import { useSelector } from "react-redux"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { saveGeneralDataThunk, setDrowerVisible, setSelectedType } from "../../store/slices/generalData.slice";
import typesData from '../../appData/types.json'
import { useDispatch } from "react-redux";
import CButton from "../general/CButton";
import { translate } from '../../utils/languageUtils.js'

const TypeOption = ({option}) => {
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const language = useSelector(state => state.localParams.language);

    const handlePress = (typeName) => {
        typeName && dispatch(setSelectedType(typeName))
        dispatch(saveGeneralDataThunk(typeName))
        dispatch(setDrowerVisible(false))
    }

    const modeStyles = StyleSheet.create({
        typeOption: {
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
                style={modeStyles.typeOption}
                onPress={()=> handlePress(option.name)}
            >
                {option.group === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'MaterialIcons' ? <MaterialIcons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'Ionicons' ? <Ionicons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'SimpleLineIcons' ? <SimpleLineIcons name={option.icon} size={50} color={colors.main1}/> : null}
                <Text>{translate(language, option.name)}</Text>
                {/* <Text>{langData.phrases[option.name][userPreferences.language]}</Text> */}
            </TouchableOpacity>
        </View>
    )
}

const TypeSelector = () => {
    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize)
    const language = useSelector(state => state.localParams.language);
    const insets = useSafeAreaInsets()

    const styles = StyleSheet.create({
        drowerContainer: {
            height: windowSize.height,
            paddingTop: insets.top + 30,
            paddingBottom: insets.bottom + 30,
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        typesGrid: {
            padding: 15,
            height: windowSize.height - 100,
            width: '100%',
            overflow: 'scroll',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    })

    return (
        <View style={styles.drowerContainer}>        
            <View style={styles.typesGrid}>
                {typesData.types.map(option => <TypeOption option={option} key={option.id}/>)}
            </View>
            <CButton title={translate(language, 'Close')} styles={{margin: 10}} onPress={() => dispatch(setDrowerVisible(false))} />
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