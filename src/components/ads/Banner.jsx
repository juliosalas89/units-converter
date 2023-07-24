import { useEffect, useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

function Banner({type = 'ANCHORED_ADAPTIVE_BANNER'}) {
  const [adUnitId] = useState(process.env.NODE_ENV === 'development' && TestIds.BANNER || 'ca-app-pub-1084528575297610~4722773949')

  return !adUnitId ? null : (
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