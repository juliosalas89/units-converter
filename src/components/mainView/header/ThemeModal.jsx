import { View, Text, FlatList, StyleSheet, Pressable } from "react-native"
import { translate } from "../../../utils/languageUtils"
import themesData from '../../../appData/themes.json'
import { useSelector } from "react-redux"
import CButton from '../../general/CButton.jsx'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { saveThemeThunk, setTheme } from '../../../store/slices/localParams.slice.js'

const ThemeModal = ({setThemeModalVisible}) => {
    const [currentTheme, setCurrentTheme] = useState(theme)

    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const language = useSelector(state => state.localParams.language);
    const theme = useSelector(state => state.localParams.theme);
    const windowSize = useSelector(state => state.localParams.windowSize);

    const handleConfirm = ()=> {
        dispatch(saveThemeThunk(theme))
        setThemeModalVisible(false)
    }
    
    const handleCancel = ()=> {
        dispatch(setTheme(currentTheme))
        setThemeModalVisible(false)
    }

    const styles = StyleSheet.create({
        themeModal: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.sec1,
            borderRadius: 5,
            width: 300,
            height: 400,
            backgroundColor: 'white',
            color: colors.main1,
            left: (windowSize.width - 300)/2,
            top: 200
        },
        scrollView: {
            height: 300,
            overflow: 'scroll' 
        },
        modalTitle: {
            fontSize: 20,
            textAlign: 'center',
            margin: 5
        },
        itemView: {
            padding: 15,
        },
        selectedItemView: {
            padding: 15,
            backgroundColor: colors.main2,
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
        <View style={styles.themeModal}>
            <View style={styles.scrollView}>
                <Text style={styles.modalTitle}>{translate(language, 'Choose Theme') + ':'}</Text>
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
                        title={translate(language, 'Cancel')}
                        onPress={() => handleCancel()} 
                        styles={{
                            paddingTop: 15, 
                            paddingBottom: 15, 
                            fontSize: 17, 
                            backgroundColor: colors.sec2, 
                            color: colors.main2
                        }} 
                    />
                </View>
                <View style={styles.buttonFrame}>
                    <CButton 
                        title={translate(language, 'Confirm')}
                        onPress={() => handleConfirm()} 
                        styles={{ 
                            paddingTop: 15, 
                            paddingBottom: 15, 
                            fontSize: 17 
                        }} 
                    />
                </View>
            </View>
        </View>
    )
}

export default ThemeModal