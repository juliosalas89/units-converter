import mobileAds from 'react-native-google-mobile-ads';

const initializeAds = () => {
    mobileAds().initialize().then(adapterStatuses => {
        console.log(adapterStatuses)
    });
}

export {initializeAds}