import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import { useFonts } from 'expo-font'
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import MainView from './mainView/MainView';
import { Dimensions } from 'react-native';
import {colors} from './Styles'
import { useEffect } from 'react';
import { setScreenSize } from '../store/slices/localParams.slice.js';

const Main = () => {
    const dispatch = useDispatch()
    const screenSize = useSelector(state => state.localParams.screenSize);
    // const [fontsLoaded] = useFonts({
    //   'Main-Font': require('./assets/fonts/SheilaCrayon-1vWg.ttf'),
    // })
  
    useEffect(() => {
        const screen = Dimensions.get('screen')
        dispatch(setScreenSize(screen))
    });

    return !screenSize ? null : (
        <SafeAreaProvider>
        <StatusBar
            backgroundColor={colors.main1}
            barStyle='light-content'
        />
        <SafeAreaView style={{ backgroundColor: colors.sec2, flex: 1 }}>
            <MainView style={{ fontSize: 30, color: 'white' }}></MainView>
        </SafeAreaView>
        </SafeAreaProvider>    
    );
}

export default Main