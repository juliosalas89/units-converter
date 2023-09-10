import CButton from '../../general/CButton.jsx'
import themesData from '../../../appData/themes.json'
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native"
import { translate } from "../../../utils/languageUtils"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setThemeThunk, setTheme } from '../../../store/slices/localParams.slice.js'

const ThemeModal = ({setThemeModalVisible}) => {
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const theme = useSelector(state => state.localParams.theme);
    const windowSize = useSelector(state => state.localParams.windowSize);

    const currentTheme = useRef(theme)

    const handleConfirm = ()=> {
        // dispatch(setThemeThunk(theme))
        setThemeModalVisible(false)
    }
    
    const handleCancel = ()=> {
        dispatch(setTheme(currentTheme.current))
        setThemeModalVisible(false)
    }

    const styles = StyleSheet.create({
        themeModal: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 10,
            borderWidth: 1,
            borderColor: colors.prim1,
            borderRadius: 5,
            width: 300,
            height: 450,
            backgroundColor: 'white',
            color: colors.prim1,
            left: (windowSize.width - 300)/2,
            top: 150
        },
        scrollView: {
            height: 350,
            overflow: 'scroll' 
        },
        modalTitle: {
            fontSize: 20,
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 25
        },
        itemView: {
            padding: 15,
        },
        selectedItemView: {
            padding: 15,
            backgroundColor: colors.prim2,
            borderRadius: 5
        },
        itemText: {
            fontSize: 17,
        },
        selectedItemText: {
            fontSize: 17,
            color: '#ffff'
        },
        buttonsContainer: {
            flexDirection: 'row',
            marginTop: 5
        },
        buttonFrame: {
            width: '50%',
            padding: 7
        }
    })

    return (
        <Pressable style={styles.themeModal}>
            <View style={styles.scrollView}>
                <Text style={styles.modalTitle}>{translate('Choose Theme') + ':'}</Text>
                <FlatList
                    data={themesData.themes}
                    renderItem={({item}) => (
                        <Pressable onPress={()=> dispatch(setTheme(item))} style={item.name === theme.name ? styles.selectedItemView : styles.itemView}>
                            <Text style={item.name === theme.name ? styles.selectedItemText : styles.itemText}>{`${item.name}`}</Text>
                        </Pressable>)
                    }
                    keyExtractor={(item, index) => item.name + index.toString()}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonFrame}>
                    <CButton 
                        title={translate('Cancel')}
                        onPress={() => handleCancel()} 
                        styles={{
                            paddingTop: 15, 
                            paddingBottom: 15, 
                            fontSize: 17, 
                            backgroundColor: colors.sec2, 
                            color: colors.prim2
                        }} 
                    />
                </View>
                <View style={styles.buttonFrame}>
                    <CButton 
                        title={translate('Confirm')}
                        onPress={() => handleConfirm()} 
                        styles={{ 
                            paddingTop: 15, 
                            paddingBottom: 15, 
                            fontSize: 17 
                        }} 
                    />
                </View>
            </View>
        </Pressable>
    )
}

export default ThemeModal