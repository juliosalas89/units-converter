import { View, Text, FlatList, StyleSheet, Pressable } from "react-native"
import { translate } from "../../../utils/languageUtils"
import { useSelector } from "react-redux"
import langData from '../../../appData/translation.json'
import CButton from '../../general/CButton'
import { useState } from "react"
import { setAndSaveLanguageThunk } from '../../../store/slices/localParams.slice.js'
import { useDispatch } from "react-redux"

const LanguageModal = ({setLanguageModalVisible}) => {
    const dispatch = useDispatch()
    const colors = useSelector(state => state.localParams.theme.colors);
    const language = useSelector(state => state.localParams.language);
    const windowSize = useSelector(state => state.localParams.windowSize);

    const [selectedLanguage, setSelectedLanguage] = useState(language) 
    
    const handleConfirm = ()=> {
        dispatch(setAndSaveLanguageThunk(selectedLanguage))
        setLanguageModalVisible(false)
    }

    const styles = StyleSheet.create({
        languageModal: {
            height: windowSize.height,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 10,
            paddingTop: 25,
            backgroundColor: 'white',
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
            marginBottom: 15
        },
        buttonFrame: {
            width: '50%',
            padding: 7
        }
    })

    return (
        <View style={styles.languageModal}>
            <View>
                <Text style={styles.modalTitle}>{`${translate(language, 'Choose Language')} ${!language ? '' : ' (Choose Language):'}`}</Text>
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
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonFrame}>
                    <CButton 
                        title={`${translate(language, 'Cancel')} ${!language ? '' : ' (Cancel)'}`}
                        onPress={()=> setLanguageModalVisible(false)} 
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
                        title={`${translate(language, 'Confirm')} ${!language ? '' : ' (OK)'}`}
                        onPress={handleConfirm} 
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

export default LanguageModal

