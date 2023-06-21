import { View } from "react-native"
import UnitsResultList from "./UnitsResultsList"
import ValueInput from "./ValueInput"
import Header from "./Header"

const MainView = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'inherit'}}>
            <Header/>
            <ValueInput></ValueInput>
            <UnitsResultList/>
        </View>
    )
}

export default MainView