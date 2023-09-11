import ThemeModal from './ThemeModal';
import LanguageModal from './LanguageModal';
import typesData from '../../../appData/types.json'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Pressable } from "react-native"
import { MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { translate } from '../../../utils/languageUtils';
import Svg, { Path } from 'react-native-svg';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setDrowerVisible } from '../../../store/slices/generalData.slice';
import { AdsConsent } from 'react-native-google-mobile-ads';
import mobileAds from 'react-native-google-mobile-ads';
import { setConsentStatusThunk } from '../../../store/slices/localParams.slice';

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [languageModalVisible, setLanguageModalVisible] = useState(false)
    const [themeModalVisible, setThemeModalVisible] = useState(false)
    const [selectedTypeData, setSelectedTypeData] = useState({})

    const dispatch = useDispatch()
    const language = useSelector(state => state.localParams.language);
    const windowSize = useSelector(state => state.localParams.windowSize);
    const colors = useSelector(state => state.localParams.theme.colors);
    const selectedType = useSelector(store => store.generalData.selectedType)
    
    useEffect(()=> {
        setSelectedTypeData(typesData.types.find(type => type.name === selectedType))
    })

    const obtainConsent = () => {
        AdsConsent.requestInfoUpdate().then(res => {
            return !res.isConsentFormAvailable ? dispatch(setConsentStatusThunk('NOT_REQUIRED')) : 
            AdsConsent.showForm()
            .then(res => {
                dispatch(setConsentStatusThunk(res.status))
                res.status === 'OBTAINED' && initializeAds()
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    const initializeAds = () => {
        mobileAds().initialize()
        .catch(err => {
            console.log(err)
        })
    }

    const styles = StyleSheet.create({
        title: {
            color: 'white', 
            fontSize: 25
        },
        optionsModal: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.prim1,
            borderRadius: 5,
            width: 220,
            backgroundColor: 'white',
            color: colors.prim1,
            left: windowSize.width - 225,
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
            backgroundColor: colors.prim1
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
        itemPressable: {
            borderBottomColor: colors.prim2,
            borderBottomWidth: 1,
            paddingTop: 2,
            paddingBottom: 2
        },
        itemPressableLast: {
            paddingTop: 2,
            paddingBottom: 2
        }
    })


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => dispatch(setDrowerVisible(true))} style={styles.typeTitleContainer}>
                <View style={styles.typeTitleIconContainer}>
                    {selectedTypeData.group === 'MaterialCommunityIcons' ? <MaterialCommunityIcons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                    {selectedTypeData.group === 'MaterialIcons' ? <MaterialIcons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                    {selectedTypeData.group === 'Ionicons' ? <Ionicons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                    {selectedTypeData.group === 'SimpleLineIcons' ? <SimpleLineIcons name={selectedTypeData.icon} size={30} color='#ffff'/> : null}
                </View>
                <Text style={styles.typeTitle}>{translate(selectedType)}</Text>
            </TouchableOpacity>
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
                        <Pressable 
                            style={styles.itemPressable}
                            android_ripple={{ color: colors.sec2 }} 
                            onPress={() => {
                                setThemeModalVisible(true)
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.optionText}>{translate('Theme')}</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.itemPressable}
                            android_ripple={{ color: colors.sec2 }} 
                            onPress={() => {
                                setLanguageModalVisible(true)
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.optionText}>{`${translate('Language')}${language ? ' (Language)' : ''}`}</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.itemPressableLast}
                            android_ripple={{ color: colors.sec2 }} 
                            onPress={() => {
                                obtainConsent()
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.optionText}>{translate('Consent Settings')}</Text>
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

