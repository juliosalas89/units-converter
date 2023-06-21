import Svg, { Polygon } from 'react-native-svg';

const FavStar = () => {
    return (
        <Svg width={20} height={20} viewBox="0 0 100 100">
            <Polygon
                points="50,0 66.5,34.4 100,38.4 75,62.2 82.6,100 50,78.8 17.4,100 25,62.2 0,38.4 33.5,34.4"
                fill="none"
                stroke="black"
            />
        </Svg>      
    )
}

export default FavStar