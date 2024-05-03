import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR, TEXT_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingsScreen = ({navigation}) => {

    return (
        <>
            <TouchableOpacity style={style.container} onPress={() => navigation.navigate('NomenclatureSettingScreen')}>
                <Ionicons name="receipt-outline" size={50} color={COLOR}/>
                <View style={{paddingLeft: 12}}>
                    <Text style={style.text}>Номенклатура</Text>
                    <Text style={style.description}>Список изготавливаемой продукции</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.container}>
                <Ionicons name="trending-up-outline" size={50} color={COLOR}/>
                <View style={{paddingLeft: 12}}>
                    <Text style={style.text}>Коэффициенты</Text>
                    <Text style={style.description}>Надбавки к зарплате</Text>
                </View>
            </TouchableOpacity>
        </>

    );
};

export default SettingsScreen;

export const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        padding: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        color: TEXT_COLOR,
        letterSpacing: 3,
    },
    description: {
        fontSize: 12,
        fontWeight: '200',
        color: TEXT_COLOR,
    }
});
