import React from 'react';
import { DeviceEventEmitter, TouchableOpacity, View } from 'react-native';
import StyleTextInput from '../components/StyleTextInput';
import { useSQLiteContext } from 'expo-sqlite/next';
import { INSERT_NOMENCLATURES } from '../utils/sqlQueries';
import { ACTIVE_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';

const ItemFormModal = ({navigation}) => {

    const db = useSQLiteContext();
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState();

    async function insertNomenclature(name, price) {
        await db.runAsync(INSERT_NOMENCLATURES, [name, price]);
    }

    return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <StyleTextInput value={name} onChangeText={setName} placeholder="Номенклатура"/>
                <StyleTextInput value={price} onChangeText={setPrice} placeholder="Цена" keyboardType="numeric"/>
            </View>
            <TouchableOpacity style={{alignItems: 'center', bottom: 30}} onPress={() => {
                insertNomenclature(name, price).then(() => {
                    DeviceEventEmitter.emit('event.updateBd');
                    navigation.goBack();
                });
            }}>
                <Ionicons name="pencil-outline" size={32} color={ACTIVE_COLOR}/>
            </TouchableOpacity>
        </View>
    );
};

export default ItemFormModal;