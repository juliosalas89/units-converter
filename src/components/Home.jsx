import MainView from './mainView/MainView';
import TypeSelector from './drowerSelector/TypeSelector';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocalParamsThunk, setConsentStatusThunk, setAdsInitialized, setWindowSizeThunk, setLanguageThunk } from '../store/slices/localParams.slice.js';
import { getGeneralDataThunk, setDrowerVisible } from '../store/slices/generalData.slice';
import mobileAds from 'react-native-google-mobile-ads';
import { AdsConsent } from 'react-native-google-mobile-ads';
import { NativeModules, BackHandler } from 'react-native'

const Home = () => {
    const isMounted = useRef(false)
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const drowerVisible = useSelector(state => state.generalData.drowerVisible);
    const windowSize = useSelector(state => state.localParams.windowSize);
    const localParamsFetched = useSelector(state => state.localParams.localParamsFetched);
    const drawerPosition = useSelector(state => state.localParams.drawerPosition);
    const language = useSelector(state => state.localParams.language);
    const colors = useSelector(state => state.localParams.theme.colors);
    const generalDataFetched = useSelector(state => state.generalData.generalDataFetched);
    const consentStatus = useSelector(state => state.localParams.consentStatus);
    // const [fontsLoaded] = useFonts({
    //   'Main-Font': require('./assets/fonts/SheilaCrayon-1vWg.ttf'),
    // })

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backEventHandler)
    })
  
    useEffect(() => {
        if(isMounted.current) return
        !generalDataFetched && dispatch(getLocalParamsThunk())
        !localParamsFetched && dispatch(getGeneralDataThunk())
        generalDataFetched && localParamsFetched && handleInitialize()
    }, [generalDataFetched, localParamsFetched]);

    const handleInitialize = () => {
        consentStatus !== 'OBTAINED' ? obtainConsent() : initialize()
        isMounted.current = true
    }

    const obtainConsent = () => {
        AdsConsent.requestInfoUpdate().then(res => {
            return !res.isConsentFormAvailable ? dispatch(setConsentStatusThunk('NOT_REQUIRED')) : 
            AdsConsent.showForm()
            .then(res => {
                dispatch(setConsentStatusThunk(res.status))
                res.status === 'OBTAINED' && initialize()
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    const initialize = () => {
        !(language || language === 0) && obtainDeviceLanguage()
        !windowSize && obtainWindowSize()
        initializeAds()
    }

    const initializeAds = () => {
        mobileAds().initialize().then(adapterStatuses => {
            dispatch(setAdsInitialized(true))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const obtainWindowSize = () => {
        const window = Dimensions.get('window')
        dispatch(setWindowSizeThunk(window))
    }
    const obtainDeviceLanguage = () => {
        const deviceLanguage = NativeModules.I18nManager.localeIdentifier
        const languageValues = [ 'en', 'es', 'de' ]
        const languageIndex = deviceLanguage ? languageValues.indexOf(deviceLanguage.slice(0,2)) : null
        !languageIndex || languageIndex < 0 ? dispatch(setLanguageThunk(0)) : dispatch(setLanguageThunk(languageIndex))
    }

    const backEventHandler = () => drowerVisible ? dispatch(setDrowerVisible(false)) : BackHandler.exitApp()

    const styles = StyleSheet.create({
        safeView: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: colors.cardBg,
            flex: 1
        }
    })

    return !windowSize || !localParamsFetched || !generalDataFetched || !(language || language === 0 ) ? null : (
        <>
            <StatusBar
                backgroundColor={colors.headerBg}
                barStyle="light-content"
            />
            <Drawer
                drawerPosition={drawerPosition}
                open={drowerVisible}
                onOpen={() => dispatch(setDrowerVisible(true))}
                onClose={() => dispatch(setDrowerVisible(false))}
                renderDrawerContent={() => {
                return <TypeSelector/>;
                }}
            >
                <View style={styles.safeView}>
                    <MainView></MainView>
                </View>
            </Drawer>
        </>
    );
}

export default Home