import { useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';

function Banner({type = 'ANCHORED_ADAPTIVE_BANNER', adMobUnitId }) {
  const consentStatus = useSelector(state => state.localParams.consentStatus)
  const adsInitialized = useSelector(state => state.localParams.adsInitialized)
  // const [adUnitId] = useState(process.env.NODE_ENV === 'development' ? TestIds.BANNER : unitId)
  const [adUnitId] = useState(process.env.NODE_ENV === 'development' ? 'ca-app-pub-3940256099942544/6300978111' : adMobUnitId)

  return !(consentStatus === 'OBTAINED' || consentStatus === 'NOT_NEEDED') || !adUnitId || !adsInitialized ? null : (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize[type]}
    />
  );
}

export default Banner