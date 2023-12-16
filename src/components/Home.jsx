import MainView from './mainView/MainView';
import TypeSelector from './drowerSelector/TypeSelector';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocalParamsThunk, setConsentStatusThunk, setAdsInitialized, setWindowSizeThunk, setLanguageThunk } from '../store/slices/localParams.slice.js';
import { getGeneralDataThunk, setTriggerDrawer } from '../store/slices/generalData.slice';
import mobileAds from 'react-native-google-mobile-ads';
import { AdsConsent } from 'react-native-google-mobile-ads';
import { NativeModules, BackHandler } from 'react-native'
import { StyleSheet, Animated, Dimensions, View } from 'react-native';

const Home = () => {
    const isMounted = useRef(false)
    const slideAnimation = useRef(new Animated.Value(0)).current
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const [showDrawer, setShowDrawer] = useState(false);
    const triggerDrawer = useSelector(state => state.generalData.triggerDrawer);
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
        Animated.timing(slideAnimation, {
          toValue: showDrawer ? 1 : 0,
          duration: showDrawer ? 200 : 100,
          useNativeDriver: false,
        }).start(() => {
            setShowDrawer(!showDrawer)
        });
    }, [triggerDrawer])
  
    useEffect(() => {
        if(isMounted.current) return
        !generalDataFetched && dispatch(getLocalParamsThunk())
        !localParamsFetched && dispatch(getGeneralDataThunk())
        generalDataFetched && localParamsFetched && handleInitialize()
    }, [generalDataFetched, localParamsFetched]);

    const handleInitialize = () => {
        consentStatus === 'OBTAINED' || consentStatus === 'NOT_NEEDED' ?  initialize() : obtainConsent()
        isMounted.current = true
    }

    const obtainConsent = () => {
        AdsConsent.requestInfoUpdate().then(res => {
            return !res.isConsentFormAvailable ? dispatch(setConsentStatusThunk('NOT_NEEDED')) : 
            AdsConsent.showForm()
            .then(res => {
                dispatch(setConsentStatusThunk(res.status))
            })
        })
        .catch(err => {
            dispatch(setConsentStatusThunk('NOT_REQUIRED'))
            console.log(err)
        })
        .finally(() => {
            initialize()
        })
    }

    const initialize = () => {
        !language && obtainDeviceLanguage()
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
        const deviceLanguage = NativeModules && NativeModules.I18nManager ? NativeModules.I18nManager.localeIdentifier : null
        const languageValues = [ 'en', 'es', 'de' ]
        const languageIndex = deviceLanguage ? languageValues.indexOf(deviceLanguage.slice(0,2)) : -1
        languageIndex < 0 ? dispatch(setLanguageThunk(0)) : dispatch(setLanguageThunk(languageIndex))
    }

    const backEventHandler = () => {
        !showDrawer ? dispatch(setTriggerDrawer()) : BackHandler.exitApp()
        return true
    }

    const styles = StyleSheet.create({
        safeView: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: colors.cardBg,
            flex: 1
        },
        container: {
            flex: 1,
        },
        drawer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 270,
            height: '100%',
            backgroundColor: colors.drowerBg,
            padding: 16,
            zIndex: 3
        },
    })

    return !windowSize || !localParamsFetched || !generalDataFetched || !(language || language === 0 ) ? null : (
        <>
            <StatusBar
                backgroundColor={colors.headerBg}
                barStyle="light-content"
            />
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.drawer,
                        { transform: [{ translateX: slideAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: drawerPosition === 'right' && windowSize ? [windowSize.width, windowSize.width-270] : [-270, 0],
                        }) }] }
                    ]}
                >
                    <TypeSelector/>
                </Animated.View>
                <View style={styles.safeView}>
                    <MainView></MainView>
                </View>
            </View>
        </>
    );
}

export default Home