import { Text, StyleSheet, FlatList, Modal, Pressable } from "react-native"
import { useSelector } from "react-redux";

const UnitsModal = ({setUnitsModalVisible, unitsModalVisible, units, handelUnitSelected}) => {
    const windowSize = useSelector(state => state.localParams.windowSize);
    const colors = useSelector(state => state.localParams.theme.colors);
    const cardLinesWidth = useSelector(state => state.localParams.theme.cardLinesWidth);
    const cardFontWeight = useSelector(state => state.localParams.theme.cardFontWeight);

    const styles = StyleSheet.create({
        modalBg: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)'
        },
        unitsModal: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.modalBorder,
            borderRadius: 5,
            width: 300,
            maxHeight: 500,
            backgroundColor: colors.modalBg,
            left: (windowSize.width - 300)/2,
            top: 150
        },
        itemPressable: {
            borderBottomColor: colors.modalLine,
            borderBottomWidth: cardLinesWidth,
            paddingTop: 2,
            paddingBottom: 2,
        },
        itemMainText: {
            fontWeight: cardFontWeight,
            color: colors.modalText,
            fontSize: 20,
        },
        itemDescriptionText: {
            fontWeight: cardFontWeight,
            color: colors.modalDescription,
            fontSize: 13
        }
    })

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={unitsModalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => {
                setUnitsModalVisible(false);
            }}
        >   
            <Pressable style={styles.modalBg} onPress={()=> setUnitsModalVisible(false)}>
                <Pressable style={styles.unitsModal}>
                    <FlatList
                        data={units}
                        keyExtractor={(item) => item.id }
                        renderItem={({item}) => (
                            <Pressable 
                                style={styles.itemPressable} 
                                onPress={() =>  handelUnitSelected(item.id)}
                                android_ripple={{ color: colors.modalPressColor }}    
                            >
                                <Text style={styles.itemMainText}>{item.unit}</Text>
                                <Text style={styles.itemDescriptionText}>{item[`description${language}`]}</Text>
                            </Pressable>
                        )}
                        />
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default UnitsModal