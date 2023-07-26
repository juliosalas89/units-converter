import ThemeModal from './ThemeModal';
import LanguageModal from './LanguageModal';
import { translate } from '../../../utils/languageUtils';
import Svg, { Path } from 'react-native-svg';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Pressable } from "react-native"
import typesData from '../../../appData/types.json'

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [languageModalVisible, setLanguageModalVisible] = useState(false)
    const [themeModalVisible, setThemeModalVisible] = useState(false)
    const [selectedTypeData, setSelectedTypeData] = useState({})

    const language = useSelector(state => state.localParams.language);
    const windowSize = useSelector(state => state.localParams.windowSize);
    const colors = useSelector(state => state.localParams.theme.colors);
    const selectedType = useSelector(store => store.generalData.selectedType)
    
    useEffect(()=> {
        setSelectedTypeData(typesData.types.find(type => type.name === selectedType))
    })

    const styles = StyleSheet.create({
        title: {
            color: 'white', 
            fontSize: 25
        },
        optionsModal: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.main1,
            borderRadius: 5,
            width: 200,
            backgroundColor: 'white',
            color: colors.main1,
            left: windowSize.width - 205,
            top: 5
        },
        optionText : {
            margin: 10,
            fontSize: 17,
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
        },
        modalBackground: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        typeTitleContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        typeTitle: {
            color: '#ffff',
            fontSize: 22,
            paddingTop: 4,
            paddingRight: 23
        },
        typeTitleIconContainer: {
            paddingTop: 4,
            marginRight: 10
        },
    })


    return (
        <View style={styles.container}>
            <View style={styles.typeTitleContainer}>
                <View style={styles.typeTitleIconContainer}>
                    {selectedTypeData.group === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                    {selectedTypeData.group === 'MaterialIcons' ? <MaterialIcons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                    {selectedTypeData.group === 'Ionicons' ? <Ionicons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                    {selectedTypeData.group === 'SimpleLineIcons' ? <SimpleLineIcons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                </View>
                <Text style={styles.typeTitle}>{selectedType}</Text>
            </View>
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
                <Pressable style={styles.modalBackground} onPress={()=> setModalVisible(false)}>
                    <Pressable style={styles.optionsModal}>
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
                            <Text style={styles.optionText}>{`${translate(language, 'Language')}${language ? ' (Language)' : ''}`}</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={themeModalVisible}
                onRequestClose={() => {
                    setThemeModalVisible(false);
                }}
            > 
                <Pressable style={styles.modalBackground} onPress={()=> setThemeModalVisible(false)}>
                    <ThemeModal setThemeModalVisible={setThemeModalVisible}/>
                </Pressable>  
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

