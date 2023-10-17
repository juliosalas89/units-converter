import CButton from '../../general/CButton.jsx'
import themesData from '../../../appData/themes.json'
import { View, Text, FlatList, StyleSheet, Pressable, Switch } from "react-native"
import { translate } from "../../../utils/languageUtils"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setThemeThunk, setTheme, setDrawerPositionThunk } from '../../../store/slices/localParams.slice.js'

const ThemeModal = ({setThemeModalVisible}) => {
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const cardFontWeight = useSelector(state => state.localParams.theme.cardFontWeight);
    const theme = useSelector(state => state.localParams.theme);
    const windowSize = useSelector(state => state.localParams.windowSize);
    const drawerPosition = useSelector(state => state.localParams.drawerPosition);

    const [selectedPosition, setSelectedPosition] = useState(drawerPosition)

    const currentTheme = useRef(theme)

    const handleConfirm = ()=> {
        dispatch(setDrawerPositionThunk(selectedPosition))
        dispatch(setThemeThunk(theme))
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
            borderColor: colors.modalBorder,
            borderRadius: 5,
            width: 300,
            height: 450,
            backgroundColor: colors.modalBg,
            left: (windowSize.width - 300)/2,
            top: 150
        },
        scrollView: {
            height: 250,
            overflow: 'scroll' 
        },
        drowerPosition: {
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        modalTitle: {
            fontSize: 20,
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 10,
            color: colors.modalText
        },
        positionViewRight: {
            width: 100,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopRightRadius: 5,
            borderBottomEndRadius: 5,
            borderWidth: 0.8,
            borderColor: colors.selectedLanguageBg
        },
        selectedPositionViewRight: {
            width: 100,
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: colors.selectedLanguageBg,
            borderTopRightRadius: 5,
            borderBottomEndRadius: 5,
        },
        positionViewLeft: {
            width: 100,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopStartRadius: 5,
            borderBottomStartRadius: 5,
            borderWidth: 0.8,
            borderColor: colors.selectedLanguageBg
        },
        selectedPositionViewLeft: {
            width: 100,
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: colors.selectedLanguageBg,
            borderTopStartRadius: 5,
            borderBottomStartRadius: 5,
        },
        drowerPositionText: {
            textAlign: 'center',
            fontWeight: cardFontWeight,
            fontSize: 17,
            color: colors.modalText
        },
        selectedDrowerPositionText: {
            textAlign: 'center',
            fontWeight: cardFontWeight,
            fontSize: 17,
            color: colors.selectedLanguageText
        },
        itemView: {
            padding: 15,
        },
        selectedItemView: {
            padding: 15,
            backgroundColor: colors.selectedLanguageBg,
            borderRadius: 5
        },
        itemText: {
            fontWeight: cardFontWeight,
            fontSize: 17,
            color: colors.modalText
        },
        selectedItemText: {
            fontWeight: cardFontWeight,
            fontSize: 17,
            color: colors.selectedLanguageText
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

    return !theme ? null : (
        <Pressable style={styles.themeModal}>
            <Text style={styles.modalTitle}>{translate('Menu Position') + ':'}</Text>
            <View style={styles.drowerPosition}>
                <Pressable onPress={()=> setSelectedPosition('left')} style={selectedPosition === 'left' ? styles.selectedPositionViewLeft : styles.positionViewLeft}>
                    <Text style={selectedPosition === 'left' ? styles.selectedDrowerPositionText : styles.drowerPositionText}>{translate('Left')}</Text>
                </Pressable>
                <Pressable onPress={()=> setSelectedPosition('right')} style={selectedPosition === 'right' ? styles.selectedPositionViewRight : styles.positionViewRight}>
                    <Text style={selectedPosition === 'right' ? styles.selectedDrowerPositionText : styles.drowerPositionText}>{translate('Right')}</Text>
                </Pressable>

            </View>
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
                            backgroundColor: colors.cancelButton, 
                            color: colors.cancelButtonText,
                            ...(theme.name !== "Default-Light" ? {} : { borderWidth: 0.8, borderColor: colors.cancelButtonText })
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
                            fontSize: 17,
                            backgroundColor: colors.confirmButton, 
                            color: colors.confirmButtonText
                        }} 
                    />
                </View>
            </View>
        </Pressable>
    )
}

export default ThemeModal