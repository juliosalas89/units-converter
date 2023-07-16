import { TextInput, Text, View, StyleSheet, FlatList, Modal } from "react-native"
import CButton from "../general/CButton.jsx"
import { useEffect, useState } from "react"
import { useRef } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { saveGeneralDataThunk, setSelectedUnitsIndexes } from "../../store/slices/generalData.slice.js"

const ValueInput = ({navigation, focusInputFlag, inputValue, handleChangeInputValue, units, selectedUnit, selectedType}) => {
    const [unitsModalVisible, setUnitsModalVisible] = useState(false)
    const inputRef = useRef(null);
    
    const dispatch = useDispatch()
    const windowSize = useSelector(state => state.localParams.windowSize);
    const colors = useSelector(state => state.localParams.theme.colors);
    
    useEffect(()=> {
        inputRef.current.blur()
        inputRef.current.focus()
    }, [focusInputFlag])

    const styles = StyleSheet.create({
        unitsModal: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.main1,
            borderRadius: 5,
            width: 300,
            height: 500,
            backgroundColor: 'white',
            color: colors.main1,
            left: (windowSize.width - 300)/2,
            top: 100
        },
        container: {
            width: '100%',
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingLeft: 18, 
            paddingRight: 18,
            paddingTop: 7, 
            paddingBottom: 7
        },
        measureInput: {
            width: '49%',
            padding: 7,
            color: colors.main1,
            fontSize: 20,
            borderWidth: 1,
            borderColor: colors.main2,
            borderRadius: 3, 
            textAlign: 'right'
        },
        unitsButton: {
            width: '49%',
            color: colors.sec2,
            backgroundColor: colors.main2,
            textAlign: 'start'
        },
        itemText: {
            fontSize: 20
        },
        itemContainer: {
            padding: 5
        }
    })

    const handelSelect = (index)=> {
        dispatch(setSelectedUnitsIndexes({[selectedType]: index }))
        dispatch(saveGeneralDataThunk())
        setUnitsModalVisible(false)
    }

    const Item = ({item, index}) => (
        <CButton 
            styles={{ 
                backgroundColor: '#ffff', 
                color: colors.main1,
                textAlign: 'left'
            }} 
            pressedColor={colors.sec1} 
            title={item.unit}
            onPress={ () =>  handelSelect(index)}
        />
    );
    
    const UnitsModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={unitsModalVisible}
                onRequestClose={() => {
                    setUnitsModalVisible(!unitsModalVisible);
                }}
            >   
                <View style={styles.unitsModal}>
                    <FlatList
                        data={units}
                        renderItem={({item, index}) => <Item item={item} index={index} />}
                        keyExtractor={(item, index) => item.unit + index.toString() }
                    />
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={styles.measureInput}
                inputMode='numeric'
                keyboardType='numeric'
                onChangeText={handleChangeInputValue}
                value={inputValue}
            />
            <CButton 
                styles={{
                    width: '49%',
                    color: colors.sec2,
                    backgroundColor: colors.main2,
                    textAlign: 'left'
                }} 
                title={selectedUnit.unit} 
                onPress={()=> setUnitsModalVisible(true)}
            />
            <UnitsModal/>
        </View>
    )
}

export default ValueInput