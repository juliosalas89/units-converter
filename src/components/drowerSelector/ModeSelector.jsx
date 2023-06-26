import { View, StyleSheet, Text, Pressable } from "react-native"
import {MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import { colors } from "../Styles"
import { useSelector } from "react-redux"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import langData from '../../appData/traduction.json'
import modesData from '../../appData/modes.json'

const ModeSelector = () => {
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
        },
        modeContainer: {
            width: '50%',
            height: 90,
        },
        modeOption: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    })

    const ModeOption = ({option}) => (
        <View style={styles.modeContainer}>
            <Pressable style={styles.modeOption}>
                {option.group === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'MaterialIcons' ? <MaterialIcons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'Ionicons' ? <Ionicons name={option.icon} size={50} color={colors.main1}/> : null}
                {option.group === 'SimpleLineIcons' ? <SimpleLineIcons name={option.icon} size={50} color={colors.main1}/> : null}
                <Text>{option.name}</Text>
                {/* <Text>{langData.phrases[option.name][userPreferences.language]}</Text> */}
            </Pressable>
        </View>
    )
    

    return (
        <View style={styles.container}>
            {modesData.modes.map(option => <ModeOption option={option} key={option.id}/>)}
        </View>
    )
}

export default ModeSelector