import React from 'react';
import { View } from 'react-native';
import List from '../components/List';

const SettingScreen = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <List navigation={navigation}></List>
        </View>
    );
};

export default SettingScreen;