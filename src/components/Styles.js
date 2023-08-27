import { StyleSheet } from "react-native"

// prim1: '#394a51',      Darkest
// prim2: '#7fa99b',      Same family as prim1 but lighter
// sec1: '#fdc57b',       Another color family, lighter than prim1
// sec2: '#fbf2d5'      Same family as sec1 but lighter

const colors =  themes[userPreferences.theme || 'default'].colors

const GlobalStyles = StyleSheet.create({
    bgMain1: {
        backgroundColor: colors.prim1
    },
    bgMain2: {
        backgroundColor: colors.prim2
    },
    bgSec1: {
        backgroundColor: colors.sec1
    },
    bgSec2: {
        backgroundColor: colors.sec2
    },
    container: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingLeft: 18, 
        paddingRight: 18,
        paddingTop: 7, 
        paddingBottom: 7
    }
})

export { colors }

export default GlobalStyles