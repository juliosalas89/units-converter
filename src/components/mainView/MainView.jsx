import { View, StyleSheet } from "react-native"
import CButton from "../general/CButton"
import UnitsResultList from "./UnitsResultsList"
import ValueInput from "./ValueInput"
import Header from "./Header"
import { useSelector } from "react-redux"

const MainView = ({navigation}) => {
    const windowSize = useSelector(state => state.localParams.windowSize);

    const styles = StyleSheet.create({
        container: {
            height: windowSize.height - 50    
        },
        footer: {
            height: 50
        }
    })

    return (
        <View style={{ height: '100%', backgroundColor: 'inherit'}}>
            <View style={styles.container}>
                <Header/>
                <ValueInput navigation={navigation}></ValueInput>
                <UnitsResultList/>
            </View>
            <View style={styles.footer}>
                <CButton styles={{width: 20, height: 50}}></CButton>
            </View>
        </View>
    )
}

export default MainView