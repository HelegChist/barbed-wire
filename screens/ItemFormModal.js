import React from 'react';
import { Button, View } from 'react-native';
import StyleTextInput from '../components/StyleTextInput';

const ItemFormModal = ({navigation}) => {
    const [nomenclature, onChangeNomenclature] = React.useState('');
    const [price, onSetPrice] = React.useState();

    return (
        <View style={{flex: 1}}>
            <StyleTextInput value={nomenclature} onChangeText={onChangeNomenclature} placeholder='Номенклатура'/>
            <StyleTextInput value={price} onChangeText={onSetPrice} placeholder='Цена' keyboardType='numeric'/>
            <Button onPress={() => navigation.goBack()} title="Dismiss"/>
        </View>
    );
};

export default ItemFormModal;