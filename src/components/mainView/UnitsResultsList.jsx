import { FlatList, ToastAndroid } from "react-native"
import Card from "./Card";
import { useEffect, useState } from "react";
import Clipboard from "@react-native-community/clipboard"
import { translate } from "../../utils/languageUtils"
import { useSelector } from "react-redux";
  
  const UnitsResultList = ({inputValue, favUnits = [], selectedId, selectedUnit, units}) => {
    const [unitsArray, setUnitsArray] = useState([])

    useEffect(() => {
      const favs = favUnits && units && favUnits.map(unitId => units.find(unit => unitId === unit.id)) || []
      const noFavs = units && units.filter(unit => favUnits.every(value => value !== unit.id)) || []
      setUnitsArray([...favs, ...noFavs])
    }, [favUnits, units])

    const copyToClipboard = (result) => {
      Clipboard.setString(result.toString());
      ToastAndroid.show(translate('Copied to clipboard'), 600)
    };

    return !unitsArray.length ? null : (
      <FlatList
          data={unitsArray}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <Card
                copyToClipboard={(result) => copyToClipboard(result)}
                item={item}
                inputValue={inputValue}
                favUnits={favUnits}
                selected={item.id === selectedId}
                selectedUnit={selectedUnit}
              ></Card>
            )}
      />     
    )
}

export default UnitsResultList
