import React from 'react';
import { Button, View } from 'react-native';
import StyleTextInput from '../components/StyleTextInput';
import uuid from 'react-native-uuid';

const ItemFormModal = ({navigation, route}) => {
    const [nomenclature, onChangeNomenclature] = React.useState('');
    const [price, onSetPrice] = React.useState();

    return (
        <View style={{flex: 1}}>
            <StyleTextInput value={nomenclature} onChangeText={onChangeNomenclature} placeholder='Номенклатура'/>
            <StyleTextInput value={price} onChangeText={onSetPrice} placeholder='Цена' keyboardType='numeric'/>
            <Button
                title="Добавить"
                onPress={() => {
                    route.params.push({nomenclature, price, id: uuid.v4()});
                    navigation.goBack();
                }}
            />
        </View>
    );
};

export default ItemFormModal;