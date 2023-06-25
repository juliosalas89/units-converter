import { useEffect, useRef } from 'react';
import UnitsList from './UnitsList';
import {
    Button,
    DrawerLayoutAndroid,
    Text,
    StyleSheet,
    View,
} from 'react-native';

const UnitsDrower = () => {
    const drawer = useRef(null);

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
        <UnitsList></UnitsList>
        <Button
            title="Close drawer"
            onPress={() => drawer.current.closeDrawer()}
        />
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={'right'}
            renderNavigationView={navigationView}
        >
            <View style={styles.container}>
                <Button
                title="Open drawer"
                onPress={() => drawer.current.openDrawer()}
                />
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
});

export default UnitsDrower;