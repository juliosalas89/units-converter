import MainView from './mainView/MainView';
import TypeSelector from './drowerSelector/TypeSelector';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWindowSize, getUserPreferencesThunk } from '../store/slices/localParams.slice.js';
import { getGeneralDataThunk, setDrowerVisible } from '../store/slices/generalData.slice';
import { initializeAds } from './ads/adsHelpers';

const Home = ({navigation}) => {
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const drowerVisible = useSelector(state => state.generalData.drowerVisible);
    const windowSize = useSelector(state => state.localParams.windowSize);
    const prefFetched = useSelector(state => state.localParams.prefFetched);
    const colors = useSelector(state => state.localParams.theme.colors);
    const generalDataFetched = useSelector(state => state.generalData.generalDataFetched);
    // const [fontsLoaded] = useFonts({
    //   'Main-Font': require('./assets/fonts/SheilaCrayon-1vWg.ttf'),
    // })
  
    useEffect(() => {
        !generalDataFetched && dispatch(getUserPreferencesThunk())
        !prefFetched && dispatch(getGeneralDataThunk())
        const window = Dimensions.get('window')
        dispatch(setWindowSize(window))
    });

    const styles = StyleSheet.create({
        safeView: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: colors.sec2, 
            flex: 1
        }
    })

    return !windowSize || !prefFetched || !generalDataFetched ? null : (
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
                    <MainView style={{ height: '100%', fontSize: 30, color: 'white' }} navigation={navigation}></MainView>
                </View>
            </Drawer>
        </>
    );
}

export default Home