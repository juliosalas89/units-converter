import { useEffect } from "react"
import { useSelector } from "react-redux";
import { adTimesAppUsedThunk, getAppRatingThunk, setAppRatedThunk, setInstallDate, setRemindMeDateThunk } from '../../store/slices/appRating.slice';
import { useDispatch } from "react-redux";
import { Alert, Platform } from "react-native";
import Rate, { AndroidMarket } from 'react-native-rate'

const AppRating = () => {
    const dispatch = useDispatch()
    const installDate = useSelector(state => state.appRating.installDate);
    const appRatingFetched = useSelector(state => state.appRating.appRatingFetched);
    const timesAppUsed = useSelector(state => state.appRating.timesAppUsed);
    const appRated = useSelector(state => state.appRating.appRated);
    const remindMeDate = useSelector(state => state.appRating.remindMeDate);

    useEffect(()=> {
        !appRatingFetched && dispatch(getAppRatingThunk())
        appRatingFetched && initAppRatingRequest()
    }, [appRatingFetched])

    const initAppRatingRequest = () => {
        !installDate ? firstTimeOpened() : (!appRated && handleShowAlert())
        timesAppUsed <= 4 && dispatch(adTimesAppUsedThunk())
    }

    const firstTimeOpened = () => {
        dispatch(setInstallDate(new Date().toISOString()))
    }

    
    const handleShowAlert = ()=> {
        const tenDaysAfterInstall = new Date(installDate).getTime() < Date.now() - 10 * 24 * 60 * 60 * 1000

        const showFirstTime = !remindMeDate && tenDaysAfterInstall && timesAppUsed > 4
        const showRemind = remindMeDate && new Date(remindMeDate).getTime() < Date.now()
        
        (showFirstTime || showRemind) && showAlert()
    }

    const showAlert = () => {
        console.log('show ALERT')

        const options = {
            AppleAppID: 'our-apple-id',
            GooglePackageName: 'our-google-package-name',
            OtherAndroidURL: 'https://play.google.com/store/apps/details?id=our-app',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: Platform.OS === 'ios',
            openAppStoreIfInAppFails: true
        };

        Alert.alert(
            "Hello! I'm Julio, the creator of this app, are you happy with it?",
            '',
            [
              {
                text: 'Yes',
                onPress: () => {
                  dispatch(setAppRatedThunk(true));
                  Rate.rate(options, (success, error) => {
                    if (error) {
                      if (Platform.OS === 'android') {
                        openURL(
                          'https://play.google.com/store/apps/details?id=our-app',
                          currentTheme
                        );
                      }
                      console.error(error);
                    }
                  });
                },
              },
              {
                text: 'No',
                onPress: () => {
                  dispatch(setAppRatedThunk(true));
                },
              },
              {
                text: 'Remind me later',
                onPress: () => {
                  const fourWeeksFromNow = Date.now() + 28 * 24 * 60 * 60 * 1000;
                  dispatch(setRemindMeDateThunk(new Date(fourWeeksFromNow).toISOString()));
                },
              },
            ]
          );
    }
}

export default AppRating