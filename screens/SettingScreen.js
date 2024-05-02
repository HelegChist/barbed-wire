import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR, PALE_ACTIVE_COLOR, PLACEHOLDER_COLOR, TEXT_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingsScreen = ({navigation}) => {

    return (
        <View style={style.container}>
            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'stretch', alignContent: 'space-between'}}>
                <Ionicons
                    name="receipt-outline"
                    size={50}
                    color={COLOR}/>
                <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', paddingLeft: 12}}>
                        <Text style={style.text}>Vertically Centered Text</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Ionicons name="chevron-forward-outline" size={32} color={TEXT_COLOR}/>
                    </View>
                </View>




            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;

export const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: TEXT_COLOR,
    }
});
