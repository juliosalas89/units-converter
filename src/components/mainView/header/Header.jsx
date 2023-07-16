// Tools:
import langData from '../../../appData/translation.json'
import ThemeModal from './ThemeModal';
import LanguageModal from './LanguageModal';
import { translate } from '../../../utils/languageUtils';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    Modal,
    Pressable,
} from "react-native"
import Svg, { Path } from 'react-native-svg';
import { useState } from "react";
// Store:
import { useSelector, useDispatch } from "react-redux";


const Header = () => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [languageModalVisible, setLanguageModalVisible] = useState(false)
    const [themeModalVisible, setThemeModalVisible] = useState(false)
    const language = useSelector(state => state.localParams.userPreferences.language);
    const windowSize = useSelector(state => state.localParams.windowSize);
    const colors = useSelector(state => state.localParams.userPreferences.theme.colors);
    
    const styles = StyleSheet.create({
        title: {
            color: 'white', 
            fontSize: 25
        },
        optionsModal: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.sec1,
            borderRadius: 5,
            width: 200,
            backgroundColor: 'white',
            color: colors.main1,
            left: windowSize.width - 205,
            top: 5
        },
        optionText : {
            margin: 5,
            fontSize: 15,
        },
        container: {
            width: '100%',
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingLeft: 18, 
            paddingRight: 18,
            paddingTop: 7, 
            paddingBottom: 7,
            backgroundColor: colors.main1
        }
    })


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Units Converter
            </Text>
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
                <Svg width="26" height="40" viewBox="0 0 18 18">
                    <Path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        fill="#FFFFFF"
                    />
                </Svg>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.optionsModal}>
                    <Pressable onPress={() => {
                        setThemeModalVisible(true)
                        setModalVisible(false)
                    }}>
                        <Text style={styles.optionText}>{translate(language, 'Theme')}</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        setLanguageModalVisible(true)
                        setModalVisible(false)
                    }}>
                        <Text style={styles.optionText}>{`${translate(language, 'Language')}${language ? ' (Language): ' : ': '}${langData.languages[language].original}`}</Text>
                    </Pressable>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={themeModalVisible}
                onRequestClose={() => {
                    setThemeModalVisible(false);
                }}
            >   
                <ThemeModal setThemeModalVisible={setThemeModalVisible}/>
            </Modal>
            <Modal
                animationType="fade"
                transparent={false}
                visible={languageModalVisible}
                onRequestClose={() => {
                    setLanguageModalVisible(false);
                }}
            >   
                <LanguageModal setLanguageModalVisible={setLanguageModalVisible}/>
            </Modal>
        </View>
    )
}

export default Header

