import React from 'react';
import { Button, View, Text } from 'react-native';

const ItemFormModal = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 30}}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss"/>
        </View>
    );
};

export default ItemFormModal;