import MainView from './mainView/MainView';
import TypeSelector from './drowerSelector/TypeSelector';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWindowSize, getUserPreferencesThunk, setAndSaveConsentStatusThunk, setAdsInitialized } from '../store/slices/localParams.slice.js';
import { getGeneralDataThunk, setDrowerVisible } from '../store/slices/generalData.slice';
import mobileAds from 'react-native-google-mobile-ads';
import { AdsConsent } from 'react-native-google-mobile-ads';

const Home = () => {
    const isMounted = useRef(false)
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const drowerVisible = useSelector(state => state.generalData.drowerVisible);
    const windowSize = useSelector(state => state.localParams.windowSize);
    const localParamsFetched = useSelector(state => state.localParams.localParamsFetched);
    const colors = useSelector(state => state.localParams.theme.colors);
    const generalDataFetched = useSelector(state => state.generalData.generalDataFetched);
    const consentStatus = useSelector(state => state.localParams.consentStatus);
    // const [fontsLoaded] = useFonts({
    //   'Main-Font': require('./assets/fonts/SheilaCrayon-1vWg.ttf'),
    // })
  
    useEffect(() => {
        if(isMounted.current) return
        !generalDataFetched && dispatch(getUserPreferencesThunk())
        !localParamsFetched && dispatch(getGeneralDataThunk())
        generalDataFetched && localParamsFetched && initializationActions()
    }, [generalDataFetched, localParamsFetched]);

    const initializationActions = () => {
        const window = Dimensions.get('window')
        dispatch(setWindowSize(window))
        console.log("STATUS IN STORAGE", consentStatus)
        consentStatus !== 'OBTAINED' ? obtainConsent() : initializeAds()
        isMounted.current = true
    }

    const obtainConsent = () => {
        AdsConsent.requestInfoUpdate().then(res => {
            return !res.isConsentFormAvailable ? dispatch(setAndSaveConsentStatusThunk('NOT_REQUIRED')) : 
            AdsConsent.showForm()
            .then(res => {
                console.log("RESPONSE",res)
                dispatch(setAndSaveConsentStatusThunk(res.status))
                res.status === 'OBTAINED' && initializeAds()
            })
        })
        .catch(error => {
            console.log("error", error)
        })
    }

    const initializeAds = () => {
        mobileAds().initialize().then(adapterStatuses => {
            console.log("initialize", adapterStatuses)
            dispatch(setAdsInitialized(true))
        });
    }

    const styles = StyleSheet.create({
        safeView: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: colors.sec2, 
            flex: 1
        }
    })

    return !windowSize || !localParamsFetched || !generalDataFetched ? null : (
        <>
            <StatusBar
                backgroundColor={colors.prim1}
                barStyle='light-content'
            />
            <Drawer
                drawerPosition="right"
                open={drowerVisible}
                onOpen={() => dispatch(setDrowerVisible(true))}
                onClose={() => dispatch(setDrowerVisible(false))}
                renderDrawerContent={() => {
                return <TypeSelector/>;
                }}
            >
                <View style={styles.safeView}>
                    <MainView style={{ height: '100%', fontSize: 30, color: 'white' }}></MainView>
                </View>
            </Drawer>
        </>
    );
}

export default Home