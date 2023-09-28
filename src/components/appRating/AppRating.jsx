import { useEffect } from "react"
import { useSelector } from "react-redux";
import CButton from '../general/CButton.jsx'
import { 
    adTimesAppUsedThunk, 
    getAppRatingThunk, 
    setAppRatedThunk, 
    setAppRatingManualOpen, 
    setInstallDate, 
    setRatingModalVisible, 
    setRemindMeDateThunk 
} from '../../store/slices/appRating.slice';
import { useDispatch } from "react-redux";
import { Alert, Modal, Platform, Pressable, Text, View } from "react-native";
import Rate, { AndroidMarket } from 'react-native-rate'
import { translate } from "../../utils/languageUtils";
import { StyleSheet } from "react-native";

const AppRating = () => {
    const dispatch = useDispatch()
    const installDate = useSelector(state => state.appRating.installDate);
    const appRatingFetched = useSelector(state => state.appRating.appRatingFetched);
    const timesAppUsed = useSelector(state => state.appRating.timesAppUsed);
    const appRated = useSelector(state => state.appRating.appRated);
    const remindMeDate = useSelector(state => state.appRating.remindMeDate);
    const ratingModalVisible = useSelector(state => state.appRating.ratingModalVisible);
    const colors = useSelector(state => state.localParams.theme.colors);
    const themeName = useSelector(state => state.localParams.theme.name);
    const cardFontWeight = useSelector(state => state.localParams.theme.cardFontWeight);
    const windowSize = useSelector(state => state.localParams.windowSize);

    useEffect(()=> {
        !appRatingFetched && dispatch(getAppRatingThunk())
        appRatingFetched && initAppRatingRequest()
    }, [appRatingFetched])

    const initAppRatingRequest = () => {
        !installDate ? firstTimeOpened() : (!appRated && handleShowModal())
        timesAppUsed <= 4 && dispatch(adTimesAppUsedThunk())
    }

    const firstTimeOpened = () => dispatch(setInstallDate(new Date().toISOString()))
    
    const handleShowModal = ()=> {
        const tenDaysAfterInstall = new Date(installDate).getTime() < Date.now() - 10 * 24 * 60 * 60 * 1000
        const showFirstTime = !remindMeDate && tenDaysAfterInstall && timesAppUsed > 4
        const showRemind = remindMeDate && new Date(remindMeDate).getTime() < Date.now()
        (showFirstTime || showRemind) && dispatch(setRatingModalVisible(true))
    }

    const handleRateApp = () => {
        const options = {
            AppleAppID: 'our-apple-id',
            GooglePackageName: 'our-google-package-name',
            OtherAndroidURL: '',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: false,
            openAppStoreIfInAppFails: true
        };
        
        Rate.rate(options, (success, error) => {
            if (success) {
                dispatch(setAppRatedThunk(true))
            }
            if (error) {
              if (Platform.OS === 'android') {
                openURL(
                  'https://play.google.com/store/apps/details?id=leofs.android.free'
                );
              }
              console.error(error);
            }
          });
    }

    const handleMaybeLater = () => {
        const fourWeeksFromNow = Date.now() + 28 * 24 * 60 * 60 * 1000;
        dispatch(setRemindMeDateThunk(new Date(fourWeeksFromNow).toISOString()));
        dispatch(setRatingModalVisible(false))
    }

    const styles = StyleSheet.create({
        modalBg: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        ratingModal: {
            padding: 15,
            borderWidth: 1,
            borderColor: colors.modalBorder,
            borderRadius: 5,
            width: 300,
            backgroundColor: colors.modalBg,
            left: (windowSize.width - 300)/2,
            top: (windowSize.height - 350)/2
        },
        modalTitle: {
            fontSize: 20,
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 25,
            color: colors.modalText
        },
        modalContent: {
            fontWeight: cardFontWeight,
            fontSize: 19,
            color: colors.modalText
        },
        buttonView: {
            paddingTop: 13
        },
        buttonsContainer: {
            paddingTop: 10
        }
    })    

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ratingModalVisible}
            onRequestClose={() => {
                dispatch(setRatingModalVisible(false))
            }}
        > 
            <Pressable style={styles.modalBg} onPress={()=> dispatch(setRatingModalVisible(false))}>
                <Pressable style={styles.ratingModal}>
                    <Text style={styles.modalTitle}>{translate("Hello! I'm Julio.")}</Text>
                    <Text style={styles.modalContent}>{translate("Help me keep doing what I love.")}</Text>
                    <Text style={styles.modalContent}>{translate("I developed this app for you. Your support and your opinion are very important.")}</Text>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonView}>
                            <CButton 
                                styles={{
                                    padding: 15, 
                                    backgroundColor: colors.confirmButton, 
                                    color: colors.confirmButtonText
                                }} 
                                onPress={handleRateApp}
                                title={translate('Sure! Rate this app')}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <CButton
                                styles={{
                                    padding: 15, 
                                    backgroundColor: colors.cancelButton, 
                                    color: colors.cancelButtonText,
                                    ...(themeName !== "Default-Light" ? {} : { borderWidth: 0.8, borderColor: colors.cancelButtonText })
                                }}
                                onPress={handleMaybeLater}
                                title={translate('Maybe later...')}
                            />
                        </View>
                    </View>
                </Pressable>
            </Pressable> 
        </Modal>
    )
}

export default AppRating


const showAlert = () => {
    const options = {
        AppleAppID: 'our-apple-id',
        GooglePackageName: 'our-google-package-name',
        OtherAndroidURL: '',
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp: true,
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
              dispatch(setAppRatingManualOpen(false))
              Rate.rate(options, (success, error) => {
                if (error) {
                  if (Platform.OS === 'android') {
                    openURL(
                      'https://play.google.com/store/apps/details?id=com.socialnmobile.dictapps.notepad.color.note',
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
              dispatch(setAppRatingManualOpen(false))
            },
          },
          {
            text: 'Remind me later',
            onPress: () => {
              const fourWeeksFromNow = Date.now() + 28 * 24 * 60 * 60 * 1000;
              dispatch(setRemindMeDateThunk(new Date(fourWeeksFromNow).toISOString()));
              dispatch(setAppRatingManualOpen(false))
            },
          },
        ]
      );
}