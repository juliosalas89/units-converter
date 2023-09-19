import Card from "./Card";
import Clipboard from "@react-native-community/clipboard"
import { FlatList, ToastAndroid } from "react-native"
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { translate } from "../../utils/languageUtils"
import { setFavUnitsThunk } from "../../store/slices/generalData.slice"
  
  const UnitsResultList = ({inputValue, favUnits = [], selectedId, selectedUnit, units = []}) => {
    const [unitsArray, setUnitsArray] = useState([])
    const [favsEdited, setFavsEdited] = useState([])
    const timer = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const favs = favUnits && units && favUnits.map(favUnitId => units.find(unit => unit && unit.id === favUnitId)) || []
        const noFavs = units && units.filter(unit => unit && favUnits.every(value => value !== unit.id)) || []
        setUnitsArray([...favs, ...noFavs])
        setFavsEdited(favUnits)
    }, [favUnits, units])

    const copyToClipboard = (result) => {
        Clipboard.setString(result.toString());
        ToastAndroid.show(translate('Copied to clipboard'), 600)
    };

    const handleSaveFavs = (pressedId) => {
        timer.current && clearTimeout(timer.current);
        
        const newFavUnits = favsEdited.includes(pressedId) ? favsEdited.filter(favId => favId !== pressedId) : [...favsEdited, pressedId]
        setFavsEdited(newFavUnits)
        
        timer.current = setTimeout(() => {
            dispatch(setFavUnitsThunk(newFavUnits))
        }, 500);
    }

    return !unitsArray.length ? null : (
        <FlatList
            data={unitsArray}
            keyExtractor={(item) => item && item.id}
            renderItem={({ item }) => !item ? null : (
                <Card
                    handleSaveFavs={handleSaveFavs}
                    copyToClipboard={(result) => copyToClipboard(result)}
                    item={item}
                    inputValue={inputValue}
                    favUnits={favUnits}
                    selected={item && item.id === selectedId}
                    selectedUnit={selectedUnit}
                ></Card>
            )}
        />     
    )
}

export default UnitsResultList
