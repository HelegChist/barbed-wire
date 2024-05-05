import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import StyleTextInput from '../components/StyleTextInput';
import { useSQLiteContext } from 'expo-sqlite/next';
import { ACTIVE_COLOR, PALE_ACTIVE_COLOR, PLACEHOLDER_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';

const ItemFormModal = ({route, navigation}) => {

    const {insertScript, name1, name2} = route.params;

    const db = useSQLiteContext();
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [color1, setColor1] = React.useState(PALE_ACTIVE_COLOR);
    const [color2, setColor2] = React.useState(PALE_ACTIVE_COLOR);

    async function insertNomenclature(name, price) {
        await db.runAsync(insertScript, [name, price]);
    }

    return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <StyleTextInput value={name} onChangeText={setName} placeholder={name1} color={color1}/>
                <StyleTextInput value={price} onChangeText={setPrice} placeholder={name2} keyboardType="numeric"
                                color={color2}/>
            </View>
            <TouchableOpacity style={{alignItems: 'center', bottom: 30}} onPress={() => {
                if (name.length === 0 && price.length === 0) {
                    setColor1(PLACEHOLDER_COLOR);
                    setColor2(PLACEHOLDER_COLOR);
                    return;
                }
                if (name.length === 0) {
                    setColor1(PLACEHOLDER_COLOR);
                    return;
                }
                if (price.length === 0) {
                    setColor2(PLACEHOLDER_COLOR);
                    return;
                }
                insertNomenclature(name, price.replaceAll(',', '.')).then(() => {
                    navigation.goBack();
                });
            }}>
                <Ionicons name="pencil-outline" size={32} color={ACTIVE_COLOR}/>
            </TouchableOpacity>
        </View>
    );
};

export default ItemFormModal;