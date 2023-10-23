import CButton from '../../general/CButton'
import Banner from "../../ads/Banner"
import langData from '../../../appData/translation.json'
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native"
import { translate } from "../../../utils/languageUtils"
import { useState } from "react"
import { setLanguageThunk } from '../../../store/slices/localParams.slice.js'
import { useSelector, useDispatch } from "react-redux"

const LanguageModal = ({setLanguageModalVisible}) => {
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const themeName = useSelector(state => state.localParams.theme.name);
    const cardFontWeight = useSelector(state => state.localParams.theme.cardFontWeight);
    const language = useSelector(state => state.localParams.language);
    const windowSize = useSelector(state => state.localParams.windowSize);

    const [selectedLanguage, setSelectedLanguage] = useState(language) 
    
    const handleConfirm = ()=> {
        dispatch(setLanguageThunk(selectedLanguage))
        setLanguageModalVisible(false)
    }

    const styles = StyleSheet.create({
        languageModal: {
            height: windowSize.height,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 10,
            paddingTop: 25,
            backgroundColor: colors.modalBg,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: cardFontWeight ? cardFontWeight.toString() : 'normal',
            textAlign: 'center',
            margin: 5,
            marginBottom: 20,
            color: colors.modalText
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
            fontWeight: cardFontWeight ? cardFontWeight.toString() : 'normal',
            fontSize: 17,
            color: colors.modalText
        },
        selectedItemText: {
            fontWeight: cardFontWeight ? cardFontWeight.toString() : 'normal',
            fontSize: 17,
            color: colors.selectedLanguageText
        },
        buttonsContainer: {
            flexDirection: 'row',
            marginBottom: 15
        },
        buttonFrame: {
            width: '50%',
            padding: 7
        },
        bannerContainer: {
            paddingBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
        }
    })

    return (
        <View style={styles.languageModal}>
            <View>
                <Text style={styles.modalTitle}>{`${translate('Choose Language')} ${!language ? '' : ' (Choose Language):'}`}</Text>
                <FlatList
                    data={langData.languages}
                    renderItem={({item, index}) => (
                        <Pressable onPress={()=> setSelectedLanguage(index)} style={index === selectedLanguage ? styles.selectedItemView : styles.itemView}>
                            <Text style={index === selectedLanguage ? styles.selectedItemText : styles.itemText}>{`${item.original} (${item.english})`}</Text>
                        </Pressable>
                    )}
                    keyExtractor={item => item.original+item.english}
                />
            </View>
            <View>
                <View style={styles.bannerContainer}>
                    <Banner type={'MEDIUM_RECTANGLE'}></Banner>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonFrame}>
                        <CButton 
                            title={`${translate('Cancel')} ${!language ? '' : ' (Cancel)'}`}
                            onPress={()=> setLanguageModalVisible(false)} 
                            styles={{
                                paddingTop: 15, 
                                paddingBottom: 15, 
                                fontSize: 17, 
                                backgroundColor: colors.cancelButton, 
                                color: colors.cancelButtonText,
                                ...(themeName !== "Default-Light" ? {} : { borderWidth: 0.8, borderColor: colors.cancelButtonText })
                            }} 
                        />
                    </View>
                    <View style={styles.buttonFrame}>
                        <CButton 
                            title={`${translate('Confirm')} ${!language ? '' : ' (OK)'}`}
                            onPress={handleConfirm} 
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
            </View>
        </View>
    )
}

export default LanguageModal

