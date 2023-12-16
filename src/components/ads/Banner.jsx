import { useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';

function Banner({type = 'ANCHORED_ADAPTIVE_BANNER'}) {
  const consentStatus = useSelector(state => state.localParams.consentStatus)
  const adsInitialized = useSelector(state => state.localParams.adsInitialized)
  const [adUnitId] = useState(process.env.NODE_ENV === 'development' ? TestIds.BANNER : 'ca-app-pub-1084528575297610~4722773949')

  return !(consentStatus === 'OBTAINED' || consentStatus === 'NOT_NEEDED') || !adUnitId || !adsInitialized ? null : (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize[type]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}

export default Banner