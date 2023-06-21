import st, { colors } from "../Styles"
import Svg, { Path } from 'react-native-svg';
import { useState } from "react";
import { useSelector } from "react-redux";
import langData from '../../appData/dictionary.json'
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    Modal,
    Pressable
} from "react-native"

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const userPreferences = useSelector(state => state.localParams.userPreferences);
    const screenSize = useSelector(state => state.localParams.screenSize);
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
            height: 120,
            backgroundColor: 'white',
            color: colors.main1,
            left: screenSize.width - 205,
            top: 5
        }
    })
    console.log(langData)
    return (
        <View style={{...st.container, backgroundColor: colors.main1,}}>
            <Text style={styles.title}>
                Units Converter
            </Text>
            <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
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
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.optionsModal}>
                    <Pressable>
                        <Text>{langData.phrases['Theme'][userPreferences.language]}</Text>
                    </Pressable>
                    <Pressable>
                        <Text>{`${langData.phrases['Language'][userPreferences.language]}${userPreferences.language ? ' (Language): ' : ': '}${langData.languages[userPreferences.language]}`}</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

export default Header

