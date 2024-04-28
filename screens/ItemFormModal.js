import React from 'react';
import { Button, View } from 'react-native';
import StyleTextInput from '../components/StyleTextInput';
import { useSQLiteContext } from 'expo-sqlite/next';

const ItemFormModal = ({navigation, route}) => {

    const db = useSQLiteContext();
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState();

    async function insertNomenclature(name, price) {
        await db.runAsync(`INSERT INTO nomenclature (NAME, PRICE)
                           VALUES (?, ?);`, [name, price]);
        await db.getAllAsync('SELECT * FROM nomenclature').then(data => console.log(data));

    }

    return (<View style={{flex: 1}}>
            <StyleTextInput value={name} onChangeText={setName} placeholder='Номенклатура'/>
            <StyleTextInput value={price} onChangeText={setPrice} placeholder='Цена' keyboardType='numeric'/>
            <Button
                title="Добавить"
                onPress={() => {
                    insertNomenclature(name, price).then(() => navigation.goBack());
                }}
            />
        </View>);
};

export default ItemFormModal;