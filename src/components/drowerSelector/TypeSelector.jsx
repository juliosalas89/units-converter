import CButton from "../general/CButton";
import typesData from '../../appData/types.json'
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setDrowerVisible, setSelectedTypeThunk } from "../../store/slices/generalData.slice";
import { useSelector, useDispatch } from "react-redux";
import { translate } from '../../utils/languageUtils.js'

const TypeOption = ({option}) => {
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);

    const handlePress = (typeName) => {
        typeName && dispatch(setSelectedTypeThunk(typeName))
        dispatch(setDrowerVisible(false))
    }

    const modeStyles = StyleSheet.create({
        typeOption: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        typeText: {
            color: colors.drowerText
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
                {option.group === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={option.icon} size={50} color={colors.drowerIcons}/> : null}
                {option.group === 'MaterialIcons' ? <MaterialIcons name={option.icon} size={50} color={colors.drowerIcons}/> : null}
                {option.group === 'Ionicons' ? <Ionicons name={option.icon} size={50} color={colors.drowerIcons}/> : null}
                {option.group === 'SimpleLineIcons' ? <SimpleLineIcons name={option.icon} size={50} color={colors.drowerIcons}/> : null}
                <Text style={modeStyles.typeText}>{translate(option.name)}</Text>
            </TouchableOpacity>
        </View>
    )
}

const TypeSelector = () => {
    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize)
    const colors = useSelector(state => state.localParams.theme.colors);
    const insets = useSafeAreaInsets()

    const styles = StyleSheet.create({
        drowerContainer: {
            height: '100%',
            paddingTop: insets.top + 30,
            paddingBottom: insets.bottom + 30,
            backgroundColor: colors.drowerBg,
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
            <CButton 
                title={translate('Close')} 
                styles={{
                    margin: 10, 
                    padding: 10, 
                    backgroundColor: colors.drowerButton, 
                    color: colors.drowerButtonText
                }} 
                onPress={() => dispatch(setDrowerVisible(false))} 
            />
        </View>
    )
}

export default TypeSelector